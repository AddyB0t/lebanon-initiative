'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { CheckCircle, Send, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { villages, getVillageName } from '@/lib/constants/villages';

type FormData = {
  // Section 1: Basic Information
  ageGroup: string;
  village: string;
  customVillage: string;
  completingAs: string;

  // Section 2: Impact of Conflict
  conflictImpacts: string[];
  conflictImpactOther: string;
  safetyComparison: string;
  householdTensions: string;

  // Section 3: Gender-Based Safety
  womenRiskLevel: string;
  increasedRisks: string[];
  feelSafeReporting: string;

  // Section 4: Access to Support
  firstApproach: string;
  barriersToHelp: string[];

  // Section 5: UNIFIL Perception
  unifilAwareness: string;
  unifilPerception: string;
  unifilSafetyEffect: string;
  womenConcernsAddressed: string;

  // Section 6: Trust & Reporting
  trustedReportingMethods: string[];
  wouldUsePortal: string;
  portalSuggestions: string;

  // Section 7: Self-Defense
  selfDefenseInterest: string;
  preferredResources: string[];
  usefulSituations: string[];

  // Section 8: Open Feedback
  biggestChallenges: string;
  wishedSupport: string;
  additionalComments: string;
};

const initialFormData: FormData = {
  ageGroup: '',
  village: '',
  customVillage: '',
  completingAs: '',
  conflictImpacts: [],
  conflictImpactOther: '',
  safetyComparison: '',
  householdTensions: '',
  womenRiskLevel: '',
  increasedRisks: [],
  feelSafeReporting: '',
  firstApproach: '',
  barriersToHelp: [],
  unifilAwareness: '',
  unifilPerception: '',
  unifilSafetyEffect: '',
  womenConcernsAddressed: '',
  trustedReportingMethods: [],
  wouldUsePortal: '',
  portalSuggestions: '',
  selfDefenseInterest: '',
  preferredResources: [],
  usefulSituations: [],
  biggestChallenges: '',
  wishedSupport: '',
  additionalComments: '',
};

export default function QuestionnairePage() {
  const t = useTranslations('questionnaire');
  const locale = useLocale();
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sections = [
    { key: 'basic', title: t('sections.basic') },
    { key: 'conflict', title: t('sections.conflict') },
    { key: 'genderSafety', title: t('sections.genderSafety') },
    { key: 'support', title: t('sections.support') },
    { key: 'unifil', title: t('sections.unifil') },
    { key: 'reporting', title: t('sections.reporting') },
    { key: 'selfDefense', title: t('sections.selfDefense') },
    { key: 'feedback', title: t('sections.feedback') },
  ];

  const progress = ((currentSection + 1) / sections.length) * 100;

  const handleCheckboxChange = (field: keyof FormData, value: string, checked: boolean) => {
    const currentValues = formData[field] as string[];
    if (checked) {
      setFormData({ ...formData, [field]: [...currentValues, value] });
    } else {
      setFormData({ ...formData, [field]: currentValues.filter((v) => v !== value) });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto text-center">
          <CardContent className="pt-12 pb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">{t('success.title')}</h2>
            <p className="text-muted-foreground mb-6">{t('success.message')}</p>
            <Button onClick={() => window.location.href = `/${locale}`}>
              {t('success.returnHome')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
        <p className="text-xl text-muted-foreground mb-2">{t('subtitle')}</p>
      </div>

      {/* Note to Users */}
      <Card className="max-w-3xl mx-auto mb-8 bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-800 font-medium mb-1">{t('note.title')}</p>
              <p className="text-blue-700 text-sm">{t('note.confidential')}</p>
              <p className="text-blue-700 text-sm">{t('note.purpose')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>{sections[currentSection].title}</span>
          <span>{currentSection + 1} / {sections.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Form Sections */}
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{sections[currentSection].title}</CardTitle>
          <CardDescription>{t(`sectionDescriptions.${sections[currentSection].key}`)}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Section 1: Basic Information */}
          {currentSection === 0 && (
            <>
              {/* Age Group */}
              <div className="space-y-3">
                <Label>{t('basic.ageGroup')}</Label>
                <RadioGroup
                  value={formData.ageGroup}
                  onValueChange={(value) => setFormData({ ...formData, ageGroup: value })}
                >
                  {['under18', '18-25', '26-35', '36-45', '46+'].map((age) => (
                    <div key={age} className="flex items-center space-x-2">
                      <RadioGroupItem value={age} id={`age-${age}`} />
                      <Label htmlFor={`age-${age}`} className="font-normal cursor-pointer">
                        {t(`basic.ageOptions.${age}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Village */}
              <div className="space-y-3">
                <Label>{t('basic.village')}</Label>
                <Select
                  value={formData.village}
                  onValueChange={(value) => setFormData({ ...formData, village: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('basic.selectVillage')} />
                  </SelectTrigger>
                  <SelectContent>
                    {villages.map((village) => (
                      <SelectItem key={village.id} value={village.id}>
                        {getVillageName(village, locale)}
                      </SelectItem>
                    ))}
                    <SelectItem value="other">{t('basic.other')}</SelectItem>
                  </SelectContent>
                </Select>
                {formData.village === 'other' && (
                  <Textarea
                    placeholder={t('basic.specifyVillage')}
                    value={formData.customVillage}
                    onChange={(e) => setFormData({ ...formData, customVillage: e.target.value })}
                  />
                )}
              </div>

              {/* Completing As */}
              <div className="space-y-3">
                <Label>{t('basic.completingAs')}</Label>
                <RadioGroup
                  value={formData.completingAs}
                  onValueChange={(value) => setFormData({ ...formData, completingAs: value })}
                >
                  {['survivor', 'witness', 'family', 'community'].map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <RadioGroupItem value={role} id={`role-${role}`} />
                      <Label htmlFor={`role-${role}`} className="font-normal cursor-pointer">
                        {t(`basic.roleOptions.${role}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </>
          )}

          {/* Section 2: Impact of Conflict */}
          {currentSection === 1 && (
            <>
              {/* Conflict Impacts */}
              <div className="space-y-3">
                <Label>{t('conflict.impacts')}</Label>
                <p className="text-sm text-muted-foreground">{t('conflict.selectAll')}</p>
                {['reducedSafety', 'movement', 'livelihood', 'displacement', 'stress', 'education', 'noImpact'].map((impact) => (
                  <div key={impact} className="flex items-center space-x-2">
                    <Checkbox
                      id={`impact-${impact}`}
                      checked={formData.conflictImpacts.includes(impact)}
                      onCheckedChange={(checked) => handleCheckboxChange('conflictImpacts', impact, checked as boolean)}
                    />
                    <Label htmlFor={`impact-${impact}`} className="font-normal cursor-pointer">
                      {t(`conflict.impactOptions.${impact}`)}
                    </Label>
                  </div>
                ))}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="impact-other"
                    checked={formData.conflictImpacts.includes('other')}
                    onCheckedChange={(checked) => handleCheckboxChange('conflictImpacts', 'other', checked as boolean)}
                  />
                  <Label htmlFor="impact-other" className="font-normal cursor-pointer">
                    {t('conflict.impactOptions.other')}
                  </Label>
                </div>
                {formData.conflictImpacts.includes('other') && (
                  <Textarea
                    placeholder={t('conflict.specifyOther')}
                    value={formData.conflictImpactOther}
                    onChange={(e) => setFormData({ ...formData, conflictImpactOther: e.target.value })}
                  />
                )}
              </div>

              {/* Safety Comparison */}
              <div className="space-y-3">
                <Label>{t('conflict.safetyComparison')}</Label>
                <RadioGroup
                  value={formData.safetyComparison}
                  onValueChange={(value) => setFormData({ ...formData, safetyComparison: value })}
                >
                  {['muchLess', 'slightlyLess', 'same', 'slightlySafer', 'muchSafer'].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem value={level} id={`safety-${level}`} />
                      <Label htmlFor={`safety-${level}`} className="font-normal cursor-pointer">
                        {t(`conflict.safetyOptions.${level}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Household Tensions */}
              <div className="space-y-3">
                <Label>{t('conflict.householdTensions')}</Label>
                <RadioGroup
                  value={formData.householdTensions}
                  onValueChange={(value) => setFormData({ ...formData, householdTensions: value })}
                >
                  {['yesSignificant', 'yesSomewhat', 'noChange', 'notSure'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`tensions-${option}`} />
                      <Label htmlFor={`tensions-${option}`} className="font-normal cursor-pointer">
                        {t(`conflict.tensionOptions.${option}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </>
          )}

          {/* Section 3: Gender-Based Safety */}
          {currentSection === 2 && (
            <>
              {/* Women Risk Level */}
              <div className="space-y-3">
                <Label>{t('genderSafety.womenRisk')}</Label>
                <RadioGroup
                  value={formData.womenRiskLevel}
                  onValueChange={(value) => setFormData({ ...formData, womenRiskLevel: value })}
                >
                  {['greater', 'same', 'lower', 'unsure'].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <RadioGroupItem value={level} id={`risk-${level}`} />
                      <Label htmlFor={`risk-${level}`} className="font-normal cursor-pointer">
                        {t(`genderSafety.riskOptions.${level}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Increased Risks */}
              <div className="space-y-3">
                <Label>{t('genderSafety.increasedRisks')}</Label>
                {['domestic', 'harassment', 'forcedMarriage', 'online', 'exploitation', 'none', 'preferNot'].map((risk) => (
                  <div key={risk} className="flex items-center space-x-2">
                    <Checkbox
                      id={`increased-${risk}`}
                      checked={formData.increasedRisks.includes(risk)}
                      onCheckedChange={(checked) => handleCheckboxChange('increasedRisks', risk, checked as boolean)}
                    />
                    <Label htmlFor={`increased-${risk}`} className="font-normal cursor-pointer">
                      {t(`genderSafety.riskTypes.${risk}`)}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Feel Safe Reporting */}
              <div className="space-y-3">
                <Label>{t('genderSafety.safeReporting')}</Label>
                <RadioGroup
                  value={formData.feelSafeReporting}
                  onValueChange={(value) => setFormData({ ...formData, feelSafeReporting: value })}
                >
                  {['yes', 'no', 'certainOrgs', 'unsure'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`report-${option}`} />
                      <Label htmlFor={`report-${option}`} className="font-normal cursor-pointer">
                        {t(`genderSafety.reportOptions.${option}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </>
          )}

          {/* Section 4: Access to Support */}
          {currentSection === 3 && (
            <>
              {/* First Approach */}
              <div className="space-y-3">
                <Label>{t('support.firstApproach')}</Label>
                <RadioGroup
                  value={formData.firstApproach}
                  onValueChange={(value) => setFormData({ ...formData, firstApproach: value })}
                >
                  {['family', 'community', 'ngo', 'police', 'international', 'noOne'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`approach-${option}`} />
                      <Label htmlFor={`approach-${option}`} className="font-normal cursor-pointer">
                        {t(`support.approachOptions.${option}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Barriers */}
              <div className="space-y-3">
                <Label>{t('support.barriers')}</Label>
                <p className="text-sm text-muted-foreground">{t('conflict.selectAll')}</p>
                {['stigma', 'retaliation', 'trust', 'information', 'transport', 'cultural'].map((barrier) => (
                  <div key={barrier} className="flex items-center space-x-2">
                    <Checkbox
                      id={`barrier-${barrier}`}
                      checked={formData.barriersToHelp.includes(barrier)}
                      onCheckedChange={(checked) => handleCheckboxChange('barriersToHelp', barrier, checked as boolean)}
                    />
                    <Label htmlFor={`barrier-${barrier}`} className="font-normal cursor-pointer">
                      {t(`support.barrierOptions.${barrier}`)}
                    </Label>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Section 5: UNIFIL Perception */}
          {currentSection === 4 && (
            <>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-sm text-muted-foreground">{t('unifil.note')}</p>
              </div>

              {/* UNIFIL Awareness */}
              <div className="space-y-3">
                <Label>{t('unifil.awareness')}</Label>
                <RadioGroup
                  value={formData.unifilAwareness}
                  onValueChange={(value) => setFormData({ ...formData, unifilAwareness: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="unifil-yes" />
                    <Label htmlFor="unifil-yes" className="font-normal cursor-pointer">{t('common.yes')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="unifil-no" />
                    <Label htmlFor="unifil-no" className="font-normal cursor-pointer">{t('common.no')}</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* UNIFIL Perception */}
              <div className="space-y-3">
                <Label>{t('unifil.perception')}</Label>
                <RadioGroup
                  value={formData.unifilPerception}
                  onValueChange={(value) => setFormData({ ...formData, unifilPerception: value })}
                >
                  {['veryPositive', 'positive', 'neutral', 'negative', 'veryNegative', 'preferNot'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`perception-${option}`} />
                      <Label htmlFor={`perception-${option}`} className="font-normal cursor-pointer">
                        {t(`unifil.perceptionOptions.${option}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* UNIFIL Safety Effect */}
              <div className="space-y-3">
                <Label>{t('unifil.safetyEffect')}</Label>
                <RadioGroup
                  value={formData.unifilSafetyEffect}
                  onValueChange={(value) => setFormData({ ...formData, unifilSafetyEffect: value })}
                >
                  {['improved', 'noChange', 'reduced', 'unsure'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`effect-${option}`} />
                      <Label htmlFor={`effect-${option}`} className="font-normal cursor-pointer">
                        {t(`unifil.effectOptions.${option}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Women Concerns Addressed */}
              <div className="space-y-3">
                <Label>{t('unifil.womenConcerns')}</Label>
                <RadioGroup
                  value={formData.womenConcernsAddressed}
                  onValueChange={(value) => setFormData({ ...formData, womenConcernsAddressed: value })}
                >
                  {['yes', 'partially', 'no', 'unsure'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`concerns-${option}`} />
                      <Label htmlFor={`concerns-${option}`} className="font-normal cursor-pointer">
                        {t(`unifil.concernOptions.${option}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </>
          )}

          {/* Section 6: Trust & Reporting */}
          {currentSection === 5 && (
            <>
              {/* Trusted Methods */}
              <div className="space-y-3">
                <Label>{t('reporting.trustedMethods')}</Label>
                {['anonymous', 'ngo', 'community', 'government', 'international'].map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <Checkbox
                      id={`method-${method}`}
                      checked={formData.trustedReportingMethods.includes(method)}
                      onCheckedChange={(checked) => handleCheckboxChange('trustedReportingMethods', method, checked as boolean)}
                    />
                    <Label htmlFor={`method-${method}`} className="font-normal cursor-pointer">
                      {t(`reporting.methodOptions.${method}`)}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Would Use Portal */}
              <div className="space-y-3">
                <Label>{t('reporting.usePortal')}</Label>
                <RadioGroup
                  value={formData.wouldUsePortal}
                  onValueChange={(value) => setFormData({ ...formData, wouldUsePortal: value })}
                >
                  {['yes', 'maybe', 'no'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`portal-${option}`} />
                      <Label htmlFor={`portal-${option}`} className="font-normal cursor-pointer">
                        {t(`reporting.portalOptions.${option}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Portal Suggestions */}
              <div className="space-y-3">
                <Label>{t('reporting.suggestions')}</Label>
                <Textarea
                  placeholder={t('reporting.suggestionsPlaceholder')}
                  value={formData.portalSuggestions}
                  onChange={(e) => setFormData({ ...formData, portalSuggestions: e.target.value })}
                  rows={3}
                />
              </div>
            </>
          )}

          {/* Section 7: Self-Defense */}
          {currentSection === 6 && (
            <>
              {/* Interest */}
              <div className="space-y-3">
                <Label>{t('selfDefense.interest')}</Label>
                <RadioGroup
                  value={formData.selfDefenseInterest}
                  onValueChange={(value) => setFormData({ ...formData, selfDefenseInterest: value })}
                >
                  {['yes', 'no', 'maybe'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`interest-${option}`} />
                      <Label htmlFor={`interest-${option}`} className="font-normal cursor-pointer">
                        {t(`selfDefense.interestOptions.${option}`)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Preferred Resources */}
              <div className="space-y-3">
                <Label>{t('selfDefense.resources')}</Label>
                {['videos', 'guides', 'workshops', 'alerts'].map((resource) => (
                  <div key={resource} className="flex items-center space-x-2">
                    <Checkbox
                      id={`resource-${resource}`}
                      checked={formData.preferredResources.includes(resource)}
                      onCheckedChange={(checked) => handleCheckboxChange('preferredResources', resource, checked as boolean)}
                    />
                    <Label htmlFor={`resource-${resource}`} className="font-normal cursor-pointer">
                      {t(`selfDefense.resourceOptions.${resource}`)}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Useful Situations */}
              <div className="space-y-3">
                <Label>{t('selfDefense.situations')}</Label>
                {['home', 'transport', 'workplace', 'community', 'displacement'].map((situation) => (
                  <div key={situation} className="flex items-center space-x-2">
                    <Checkbox
                      id={`situation-${situation}`}
                      checked={formData.usefulSituations.includes(situation)}
                      onCheckedChange={(checked) => handleCheckboxChange('usefulSituations', situation, checked as boolean)}
                    />
                    <Label htmlFor={`situation-${situation}`} className="font-normal cursor-pointer">
                      {t(`selfDefense.situationOptions.${situation}`)}
                    </Label>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Section 8: Open Feedback */}
          {currentSection === 7 && (
            <>
              <div className="space-y-3">
                <Label>{t('feedback.challenges')}</Label>
                <Textarea
                  placeholder={t('feedback.challengesPlaceholder')}
                  value={formData.biggestChallenges}
                  onChange={(e) => setFormData({ ...formData, biggestChallenges: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <Label>{t('feedback.wishedSupport')}</Label>
                <Textarea
                  placeholder={t('feedback.wishedSupportPlaceholder')}
                  value={formData.wishedSupport}
                  onChange={(e) => setFormData({ ...formData, wishedSupport: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <Label>{t('feedback.additional')}</Label>
                <Textarea
                  placeholder={t('feedback.additionalPlaceholder')}
                  value={formData.additionalComments}
                  onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                  rows={4}
                />
              </div>

              {/* Ethical Note */}
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="pt-4">
                  <p className="text-purple-800 font-medium mb-2">{t('ethical.title')}</p>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• {t('ethical.voluntary')}</li>
                    <li>• {t('ethical.noBlame')}</li>
                    <li>• {t('ethical.respect')}</li>
                  </ul>
                </CardContent>
              </Card>
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={() => setCurrentSection(currentSection - 1)}
              disabled={currentSection === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              {t('navigation.previous')}
            </Button>

            {currentSection < sections.length - 1 ? (
              <Button onClick={() => setCurrentSection(currentSection + 1)}>
                {t('navigation.next')}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  t('navigation.submitting')
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {t('navigation.submit')}
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
