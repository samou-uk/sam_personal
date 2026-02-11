'use client'

import React from 'react'
import Navigation from '@/components/Navigation'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />

      <div className="pt-20 pb-16 md:pb-0">
        <section className="pt-32 pb-32">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-6xl md:text-7xl font-extralight text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
                <span className="inline-block">Privacy</span>{' '}
                <span className="inline-block text-primary dark:text-[#ADD8E6]">Policy</span>
              </h1>
              <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-2xl">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* Content */}
            <div className="space-y-8 text-slate-700 dark:text-slate-300 font-light leading-relaxed">
              <div>
                <h2 className="text-xl font-normal text-slate-900 dark:text-slate-100 mb-3">
                  Information We Collect
                </h2>
                <p className="text-base mb-3">
                  This website uses Vercel Analytics and Vercel Speed Insights to collect visitor and page view data, as well as performance metrics. This includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base ml-4">
                  <li>Page views and navigation patterns</li>
                  <li>Referral sources (how you arrived at the site)</li>
                  <li>Browser and device information</li>
                  <li>General geographic location (country/city level)</li>
                  <li>Page load times and performance metrics</li>
                  <li>Core Web Vitals data (LCP, FID, CLS)</li>
                </ul>
                <p className="text-base mt-3">
                  This data is collected automatically and helps me understand how the site is being used, identify performance issues, and improve the user experience. No personally identifiable information is collected.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-normal text-slate-900 dark:text-slate-100 mb-3">
                  How We Use Your Information
                </h2>
                <p className="text-base mb-3">
                  The analytics data collected is used to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base ml-4">
                  <li>Understand which pages are most popular</li>
                  <li>Identify technical issues and improve site performance</li>
                  <li>Monitor page load times and optimize performance</li>
                  <li>Make informed decisions about content and features</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-normal text-slate-900 dark:text-slate-100 mb-3">
                  Data Storage and Security
                </h2>
                <p className="text-base">
                  Analytics and performance data is processed and stored by Vercel Analytics and Vercel Speed Insights in accordance with their privacy policies. The data is aggregated and anonymized. I do not have access to individual user identities or personal information.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-normal text-slate-900 dark:text-slate-100 mb-3">
                  Cookies and Local Storage
                </h2>
                <p className="text-base mb-3">
                  This website may use cookies or similar tracking technologies through Vercel Analytics and Vercel Speed Insights. You can control cookie preferences through your browser settings.
                </p>
                <p className="text-base">
                  Additionally, this website uses browser localStorage to store your theme preference (light or dark mode). This preference is stored locally on your device and is not transmitted to any server. You can clear this data at any time through your browser settings, which will reset the theme to your system preference.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-normal text-slate-900 dark:text-slate-100 mb-3">
                  Third-Party Services
                </h2>
                <p className="text-base mb-3">
                  This website is hosted on Vercel and uses Vercel Analytics and Vercel Speed Insights. For more information about how Vercel handles data, please refer to their privacy policy.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-normal text-slate-900 dark:text-slate-100 mb-3">
                  Your Rights
                </h2>
                <p className="text-base">
                  Since we do not collect personally identifiable information, there is no personal data to access, modify, or delete. If you have questions about the analytics data collected, you can contact me at scou@uwaterloo.ca.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-normal text-slate-900 dark:text-slate-100 mb-3">
                  Changes to This Policy
                </h2>
                <p className="text-base">
                  I may update this privacy policy from time to time. The "Last updated" date at the top of this page will reflect any changes.
                </p>
              </div>

              {/* Terms of Use Section */}
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800 mt-12">
                <h1 className="text-4xl md:text-5xl font-extralight text-slate-900 dark:text-slate-100 mb-6 tracking-tight">
                  <span className="inline-block">Terms of</span>{' '}
                  <span className="inline-block text-primary dark:text-[#ADD8E6]">Use</span>
                </h1>
              </div>

              <div>
                <h2 className="text-xl font-normal text-slate-900 dark:text-slate-100 mb-3">
                  Acceptance of Terms
                </h2>
                <p className="text-base">
                  By accessing and using this website, you accept and agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use this website.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-normal text-slate-900 dark:text-slate-100 mb-3">
                  Use of Content
                </h2>
                <p className="text-base mb-3">
                  All content on this website, including but not limited to text, images, graphics, and code, is the property of Sam Chusen Ou unless otherwise stated. You may:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base ml-4">
                  <li>View and browse the content for personal, non-commercial use</li>
                  <li>Share links to pages on this website</li>
                </ul>
                <p className="text-base mt-3">
                  You may not reproduce, distribute, modify, or create derivative works from the content without explicit written permission.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-normal text-slate-900 dark:text-slate-100 mb-3">
                  Accuracy of Information
                </h2>
                <p className="text-base">
                  While I strive to keep the information on this website accurate and up-to-date, I make no representations or warranties about the completeness, accuracy, or reliability of any information. The content is provided "as is" without any guarantees.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-normal text-slate-900 dark:text-slate-100 mb-3">
                  External Links
                </h2>
                <p className="text-base">
                  This website may contain links to external websites. I am not responsible for the content, privacy policies, or practices of these external sites. Use them at your own discretion.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-normal text-slate-900 dark:text-slate-100 mb-3">
                  Limitation of Liability
                </h2>
                <p className="text-base">
                  I shall not be liable for any damages arising from the use or inability to use this website, including but not limited to direct, indirect, incidental, or consequential damages.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-normal text-slate-900 dark:text-slate-100 mb-3">
                  Changes to Terms
                </h2>
                <p className="text-base">
                  I reserve the right to modify these Terms of Use at any time. Continued use of the website after changes constitutes acceptance of the modified terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-normal text-slate-900 dark:text-slate-100 mb-3">
                  Contact
                </h2>
                <p className="text-base">
                  If you have any questions about these Privacy Policy or Terms of Use, please contact me at scou@uwaterloo.ca.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

