'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Lock, BarChart3, FileText, MessageSquare, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Stats {
  total: number;
  pending: number;
  underReview: number;
  inProgress: number;
  resolved: number;
  closed: number;
  questionnaires: number;
}

interface Grievance {
  id: string;
  tracking_code: string;
  complainant_name: string | null;
  complainant_email: string | null;
  complainant_phone: string | null;
  is_anonymous: boolean;
  grievance_type: string;
  description: string;
  status: string;
  admin_notes: string | null;
  created_at: string;
  status_updated_at: string;
}

export default function AdminPage() {
  const t = useTranslations('admin');
  const locale = useLocale();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/verify');
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        loadStats();
        loadGrievances();
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        loadStats();
        loadGrievances();
      } else {
        setError(t('login.error'));
      }
    } catch {
      setError(t('login.error'));
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/verify', { method: 'DELETE' });
    setIsAuthenticated(false);
  };

  const loadStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setStats(data.stats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const loadGrievances = async (page = 1, status = 'all') => {
    try {
      const params = new URLSearchParams({ page: String(page), limit: '10' });
      if (status !== 'all') params.set('status', status);

      const res = await fetch(`/api/admin/grievances?${params}`);
      const data = await res.json();
      setGrievances(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to load grievances:', error);
    }
  };

  const updateGrievanceStatus = async (id: string, newStatus: string, notes?: string) => {
    try {
      await fetch('/api/admin/grievances', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus, admin_notes: notes }),
      });
      loadGrievances(currentPage, statusFilter);
      loadStats();
      setSelectedGrievance(null);
    } catch (error) {
      console.error('Failed to update grievance:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      submitted: 'secondary',
      under_review: 'outline',
      in_progress: 'default',
      resolved: 'default',
      closed: 'secondary',
    };
    const colors: Record<string, string> = {
      submitted: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-purple-100 text-purple-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800',
    };
    return (
      <Badge className={colors[status] || ''} variant={variants[status] || 'secondary'}>
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>{t('login.title')}</CardTitle>
            <CardDescription>Enter the admin password to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">{t('login.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full">
                {t('login.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground">Manage grievances and monitor platform activity</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-xl">
          <TabsTrigger value="dashboard" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            {t('tabs.dashboard')}
          </TabsTrigger>
          <TabsTrigger value="grievances" className="gap-2">
            <FileText className="h-4 w-4" />
            {t('tabs.grievances')}
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            {t('tabs.chatbot')}
          </TabsTrigger>
          <TabsTrigger value="content" className="gap-2">
            <Settings className="h-4 w-4" />
            {t('tabs.content')}
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Grievances</CardDescription>
                <CardTitle className="text-3xl">{stats?.total || 0}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Pending Review</CardDescription>
                <CardTitle className="text-3xl text-yellow-600">{stats?.pending || 0}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>In Progress</CardDescription>
                <CardTitle className="text-3xl text-purple-600">{stats?.inProgress || 0}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Resolved</CardDescription>
                <CardTitle className="text-3xl text-green-600">{stats?.resolved || 0}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Survey Responses</CardTitle>
              <CardDescription>Total questionnaire submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{stats?.questionnaires || 0}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Grievances Tab */}
        <TabsContent value="grievances">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Grievances</CardTitle>
                  <CardDescription>Manage and review submitted grievances</CardDescription>
                </div>
                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    loadGrievances(1, value);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking Code</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grievances.map((grievance) => (
                    <TableRow key={grievance.id}>
                      <TableCell className="font-mono">{grievance.tracking_code}</TableCell>
                      <TableCell className="capitalize">{grievance.grievance_type.replace('_', ' ')}</TableCell>
                      <TableCell>{getStatusBadge(grievance.status)}</TableCell>
                      <TableCell>{new Date(grievance.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedGrievance(grievance)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() => loadGrievances(currentPage - 1, statusFilter)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    onClick={() => loadGrievances(currentPage + 1, statusFilter)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chatbot Test Tab */}
        <TabsContent value="chatbot">
          <Card>
            <CardHeader>
              <CardTitle>Chatbot Test</CardTitle>
              <CardDescription>Test the AI chatbot functionality</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The chatbot uses OpenRouter with GPT-4o to provide supportive responses to users.
                Test it by using the chat widget on any page.
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Configuration</h4>
                <p className="text-sm text-muted-foreground">Model: {process.env.OPENROUTER_MODEL || 'openai/gpt-4o'}</p>
                <p className="text-sm text-muted-foreground">
                  API Key: {process.env.OPENROUTER_API_KEY ? '****' + process.env.OPENROUTER_API_KEY.slice(-4) : 'Not configured'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Management Tab */}
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Manage videos, resources, and other content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Content management features coming soon. Currently, content is managed through the
                database directly.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Self-Defense Videos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Manage YouTube video content</p>
                    <Button variant="outline" disabled>Manage Videos</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Helplines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Manage emergency contacts</p>
                    <Button variant="outline" disabled>Manage Helplines</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Grievance Detail Modal */}
      <Dialog open={!!selectedGrievance} onOpenChange={() => setSelectedGrievance(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedGrievance && (
            <>
              <DialogHeader>
                <DialogTitle>Grievance Details</DialogTitle>
                <DialogDescription>
                  Tracking Code: {selectedGrievance.tracking_code}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedGrievance.status)}</div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Type</Label>
                    <p className="mt-1 capitalize">{selectedGrievance.grievance_type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Submitted</Label>
                    <p className="mt-1">{new Date(selectedGrievance.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Anonymous</Label>
                    <p className="mt-1">{selectedGrievance.is_anonymous ? 'Yes' : 'No'}</p>
                  </div>
                </div>

                {!selectedGrievance.is_anonymous && (
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Name: {selectedGrievance.complainant_name || 'N/A'}</div>
                      <div>Email: {selectedGrievance.complainant_email || 'N/A'}</div>
                      <div>Phone: {selectedGrievance.complainant_phone || 'N/A'}</div>
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-muted-foreground">Description</Label>
                  <p className="mt-1 p-4 bg-muted rounded-lg whitespace-pre-wrap">
                    {selectedGrievance.description}
                  </p>
                </div>

                <div>
                  <Label htmlFor="admin-notes">Admin Notes</Label>
                  <Textarea
                    id="admin-notes"
                    defaultValue={selectedGrievance.admin_notes || ''}
                    placeholder="Add internal notes..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Update Status</Label>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateGrievanceStatus(selectedGrievance.id, 'under_review')}
                    >
                      Under Review
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateGrievanceStatus(selectedGrievance.id, 'in_progress')}
                    >
                      In Progress
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => updateGrievanceStatus(selectedGrievance.id, 'resolved')}
                    >
                      Resolved
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => updateGrievanceStatus(selectedGrievance.id, 'closed')}
                    >
                      Closed
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
