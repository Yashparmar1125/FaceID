


const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6">Privacy Policy</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-lg">
            Welcome to FaceID. We value your privacy and are committed to protecting your personal data. This Privacy
            Policy outlines how we collect, use, and protect your information when you visit our website and use our
            services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-lg">
            We collect personal information such as your name, email address, and facial data when you register and use
            our face recognition system. We also collect usage data, cookies, and other non-personally identifiable
            information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="text-lg">
            The information we collect is used to improve our service, personalize your experience, and enhance
            security. We do not sell or share your personal information with third parties without your consent, except
            where required by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-lg">
            We take appropriate measures to protect your data from unauthorized access, alteration, or destruction. 
            However, no data transmission over the internet is 100% secure, so we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
          <p className="text-lg">
            We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting
            the updated policy on our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-lg">
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@faceid.com" className="text-blue-400">support@faceid.com</a>.
          </p>
        </section>
      </div>
      
    </div>
  )
}

export default PrivacyPolicy
