import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-['Press_Start_2P'] text-xs">Back to Home</span>
        </Link>

        <h1 className="font-['Press_Start_2P'] text-xl md:text-2xl text-primary mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              Introduction
            </h2>
            <p>
              This Privacy Policy explains how XMRT DAO ("we," "us," or "our") collects, uses, 
              and protects information when you use the MobileMonero mining application and related services. 
              By using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              Information We Collect
            </h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Wallet Addresses:</strong> Monero wallet addresses used for mining payouts</li>
              <li><strong>Mining Statistics:</strong> Hashrate, shares submitted, and mining session data</li>
              <li><strong>Device Information:</strong> Basic device type (mobile/PC) for optimizing mining instructions</li>
              <li><strong>Usage Data:</strong> How you interact with our application to improve user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To facilitate cryptocurrency mining through the SupportXMR pool</li>
              <li>To display mining statistics and leaderboard information</li>
              <li>To manage collective fund distribution through the XMRT DAO</li>
              <li>To improve our services and user experience</li>
              <li>To communicate important updates about the mining pool or DAO</li>
            </ul>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              Collective Fund Management
            </h2>
            <p>
              Funds mined through MobileMonero are collectively managed by{" "}
              <a 
                href="https://suite-beta.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline"
              >
                Suite AI
              </a>{" "}
              for the benefit of XMRT DAO and its member contributors. Mining proceeds are distributed 
              according to DAO governance rules and contributor participation.
            </p>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              Third-Party Services
            </h2>
            <p className="mb-3">Our service integrates with the following third-party services:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>SupportXMR:</strong> Mining pool service for Monero mining</li>
              <li><strong>Termux:</strong> Terminal application for Android devices (user-installed)</li>
              <li><strong>XMRig:</strong> Mining software for PC platforms</li>
            </ul>
            <p className="mt-3">
              These services have their own privacy policies, and we encourage you to review them.
            </p>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to protect your information. 
              However, no method of transmission over the Internet or electronic storage is 100% secure. 
              While we strive to protect your data, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              Cookies and Tracking
            </h2>
            <p>
              We use minimal cookies and local storage to remember your preferences (such as language 
              and platform settings). We do not use third-party tracking or advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              Your Rights
            </h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access information we hold about your mining activity</li>
              <li>Request correction of inaccurate data</li>
              <li>Stop using our services at any time</li>
              <li>Contact us with questions about your data</li>
            </ul>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify users of any 
              significant changes by posting the new policy on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="font-['Press_Start_2P'] text-xs text-foreground mb-4">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:{" "}
              <a 
                href="mailto:xmrtsolutions@gmail.com?subject=Privacy Policy Inquiry"
                className="text-primary hover:text-primary/80 underline"
              >
                xmrtsolutions@gmail.com
              </a>
            </p>
          </section>

          <section className="pt-4 border-t border-border">
            <p className="text-xs">
              Last updated: January 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
