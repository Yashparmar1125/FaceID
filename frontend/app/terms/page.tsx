

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6">Terms of Service</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-lg">
            These Terms of Service govern your use of FaceID services. By using our website and services, you agree to
            abide by these terms. If you do not agree to these terms, please refrain from using our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>
          <p className="text-lg">
            You agree not to use our services for any unlawful or prohibited activities, including but not limited to
            unauthorized access to our systems, distributing malware, or infringing on the rights of others.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Account Security</h2>
          <p className="text-lg">
            You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us
            immediately if you suspect any unauthorized access to your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Limitations of Liability</h2>
          <p className="text-lg">
            FaceID is not liable for any damages arising from the use of our services, including but not limited to
            data loss, service interruptions, or indirect damages.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Modifications to the Terms</h2>
          <p className="text-lg">
            We may update these Terms of Service at any time. Any changes will be posted on our website, and the
            updated terms will take effect immediately upon posting.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
          <p className="text-lg">
            These terms are governed by the laws of the jurisdiction in which FaceID operates. Any disputes will be
            resolved in the appropriate courts in that jurisdiction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-lg">
            If you have any questions about these Terms of Service, please contact us at <a href="mailto:support@faceid.com" className="text-blue-400">support@faceid.com</a>.
          </p>
        </section>
      </div>
     
    </div>
  )
}

export default TermsOfService
