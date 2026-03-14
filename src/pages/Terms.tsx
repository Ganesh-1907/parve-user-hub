import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Terms = () => {
  return (
    <div className="py-8 md:py-12">
      <div className="container max-w-6xl">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">
          Terms & Services
        </h1>

        <Accordion type="single" collapsible className="space-y-4">
          {/* Terms & Conditions */}
          <AccordionItem value="terms" className="bg-card rounded-xl px-6 shadow-soft border-none">
            <AccordionTrigger className="text-lg font-serif font-semibold hover:no-underline">
              Terms & Conditions
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <h4 className="font-semibold text-foreground uppercase tracking-wide">Overview</h4>
              <p>
                This website is operated by PARVE. Throughout the site, the terms "we", "us" and "our" refer to PARVE.
                PARVE offers this website, including all information, tools and Services available from this site to you,
                the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
              </p>
              <p>
                By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be
                bound by the following terms and conditions ("Terms of Service", "Terms"), including those additional
                terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service
                apply to all users of the site, including without limitation users who are browsers, vendors, customers,
                merchants, and/or contributors of content.
              </p>
              <p>
                Please read these Terms of Service carefully before accessing or using our website. By accessing or using
                any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the
                terms and conditions of this agreement, then you may not access the website or use any Services.
              </p>
              <p>
                Any new features or tools which are added to the current store shall also be subject to the Terms of
                Service. We reserve the right to update, change or replace any part of these Terms of Service by posting
                updates and/or changes to our website. It is your responsibility to check this page periodically for
                changes. Your continued use of or access to the website following the posting of any changes constitutes
                acceptance of those changes.
              </p>

              <h4 className="font-semibold text-foreground">Section 1 – Online Store Terms</h4>
              <p>
                By agreeing to these Terms of Service, you represent that you are at least the age of majority in your
                state or province of residence, or that you have given us your consent to allow any of your minor
                dependents to use this site.
              </p>
              <p>
                You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the
                Service, violate any laws in your jurisdiction (including but not limited to copyright laws). You must
                not transmit any worms or viruses or any code of a destructive nature. A breach or violation of any of
                the Terms will result in an immediate termination of your Services.
              </p>

              <h4 className="font-semibold text-foreground">Section 2 – General Conditions</h4>
              <p>
                We reserve the right to refuse service to anyone for any reason at any time. You understand that your
                content (not including credit card information) may be transferred unencrypted and involve (a)
                transmissions over various networks; and (b) changes to conform and adapt to technical requirements of
                connecting networks or devices. Credit card information is always encrypted during transfer over networks.
              </p>
              <p>
                You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service without
                express written permission by us. The headings used in this agreement are included for convenience only
                and will not limit or otherwise affect these Terms.
              </p>

              <h4 className="font-semibold text-foreground">Section 3 – Accuracy, Completeness and Timeliness of Information</h4>
              <p>
                We are not responsible if information made available on this site is not accurate, complete or current.
                The material on this site is provided for general information only and should not be relied upon as the
                sole basis for making decisions. Any reliance on the material on this site is at your own risk. We
                reserve the right to modify the contents of this site at any time, but we have no obligation to update
                any information on our site.
              </p>

              <h4 className="font-semibold text-foreground">Section 4 – Modifications to the Service and Prices</h4>
              <p>
                Prices for our products are subject to change without notice. We reserve the right at any time to modify
                or discontinue the Service (or any part or content thereof) without notice. We shall not be liable to
                you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
              </p>

              <h4 className="font-semibold text-foreground">Section 5 – Products or Services</h4>
              <p>
                Certain products or Services may be available exclusively online through the website. These products or
                Services may have limited quantities and are subject to return or exchange only according to our Return
                Policy. We have made every effort to display as accurately as possible the colors and images of our
                products. We cannot guarantee that your computer monitor's display of any color will be accurate.
              </p>
              <p>
                We reserve the right to limit the sales of our products or Services to any person, geographic region or
                jurisdiction. All descriptions of products or product pricing are subject to change at any time without
                notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any
                offer for any product or service made on this site is void where prohibited.
              </p>
              <p>
                We do not warrant that the quality of any products, Services, information, or other material purchased
                or obtained by you will meet your expectations, or that any errors in the Service will be corrected.
              </p>

              <h4 className="font-semibold text-foreground">Section 6 – Accuracy of Billing and Account Information</h4>
              <p>
                We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or
                cancel quantities purchased per person, per household or per order. In the event that we make a change
                to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone
                number provided at the time the order was made.
              </p>
              <p>
                You agree to provide current, complete and accurate purchase and account information for all purchases
                made at our store. You agree to promptly update your account and other information, including your email
                address and credit card numbers and expiration dates, so that we can complete your transactions and
                contact you as needed. For more detail, please review our Returns Policy.
              </p>

              <h4 className="font-semibold text-foreground">Section 7 – Optional Tools</h4>
              <p>
                We may provide you with access to third-party tools over which we neither monitor nor have any control
                nor input. You acknowledge and agree that we provide access to such tools "as is" and "as available"
                without any warranties, representations or conditions of any kind and without any endorsement. We shall
                have no liability whatsoever arising from or relating to your use of optional third-party tools. Any use
                by you of optional tools offered through the site is entirely at your own risk and discretion.
              </p>

              <h4 className="font-semibold text-foreground">Section 8 – Third-Party Links</h4>
              <p>
                Certain content, products and Services available via our Service may include materials from third-parties.
                Third-party links on this site may direct you to third-party websites that are not affiliated with us.
                We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will
                not have any liability or responsibility for any third-party materials or websites, or for any other
                materials, products, or Services of third-parties.
              </p>
              <p>
                We are not liable for any harm or damages related to the purchase or use of goods, Services, resources,
                content, or any other transactions made in connection with any third-party websites. Please review
                carefully the third-party's policies and practices before engaging in any transaction. Complaints, claims,
                concerns, or questions regarding third-party products should be directed to the third-party.
              </p>

              <h4 className="font-semibold text-foreground">Section 9 – User Comments, Feedback and Other Submissions</h4>
              <p>
                If you send certain specific submissions or creative ideas, suggestions, proposals, plans, or other
                materials, you agree that we may, at any time, without restriction, edit, copy, publish, distribute,
                translate and otherwise use in any medium any comments that you forward to us. We are under no obligation
                (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond
                to any comments.
              </p>
              <p>
                We may, but have no obligation to, monitor, edit or remove content that we determine in our sole
                discretion to be unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or
                otherwise objectionable or in violation of these Terms of Service. You are solely responsible for any
                comments you make and their accuracy.
              </p>

              <h4 className="font-semibold text-foreground">Section 10 – Personal Information</h4>
              <p>
                Your submission of personal information through the store is governed by our Privacy Policy.
              </p>

              <h4 className="font-semibold text-foreground">Section 11 – Errors, Inaccuracies and Omissions</h4>
              <p>
                Occasionally there may be information on our site or in the Service that contains typographical errors,
                inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product
                shipping charges, transit times and availability. We reserve the right to correct any errors,
                inaccuracies or omissions, and to change or update information or cancel orders if any information in
                the Service or on any related website is inaccurate at any time without prior notice.
              </p>

              <h4 className="font-semibold text-foreground">Section 12 – Prohibited Uses</h4>
              <p>In addition to other prohibitions set forth in the Terms of Service, you are prohibited from using the site or its content:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>(a) for any unlawful purpose;</li>
                <li>(b) to solicit others to perform or participate in any unlawful acts;</li>
                <li>(c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances;</li>
                <li>(d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others;</li>
                <li>(e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability;</li>
                <li>(f) to submit false or misleading information;</li>
                <li>(g) to upload or transmit viruses or any other type of malicious code;</li>
                <li>(h) to collect or track the personal information of others;</li>
                <li>(i) to spam, phish, pharm, pretext, spider, crawl, or scrape;</li>
                <li>(j) for any obscene or immoral purpose; or</li>
                <li>(k) to interfere with or circumvent the security features of the Service or any related website.</li>
              </ul>
              <p>We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.</p>

              <h4 className="font-semibold text-foreground">Section 13 – Disclaimer of Warranties; Limitation of Liability</h4>
              <p>
                We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely,
                secure or error-free. We do not warrant that the results that may be obtained from the use of the service
                will be accurate or reliable.
              </p>
              <p>
                You agree that from time to time we may remove the service for indefinite periods of time or cancel the
                service at any time, without notice to you. You expressly agree that your use of, or inability to use,
                the service is at your sole risk. The service and all products and Services delivered to you through the
                service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without
                any representation, warranties or conditions of any kind, either express or implied, including all implied
                warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose,
                durability, title, and non-infringement.
              </p>
              <p>
                In no case shall PARVE, our directors, officers, employees, affiliates, agents, contractors, interns,
                suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect,
                incidental, punitive, special, or consequential damages of any kind, including, without limitation, lost
                profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether
                based in contract, tort (including negligence), strict liability or otherwise, arising from your use of
                any of the service or any products procured using the service, or for any other claim related in any way
                to your use of the service or any product, including, but not limited to, any errors or omissions in any
                content, or any loss or damage of any kind incurred as a result of the use of the service or any content
                (or product) posted, transmitted, or otherwise made available via the service, even if advised of their
                possibility.
              </p>
              <p>
                Because some states or jurisdictions do not allow the exclusion or the limitation of liability for
                consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to
                the maximum extent permitted by law.
              </p>

              <h4 className="font-semibold text-foreground">Section 14 – Indemnification</h4>
              <p>
                You agree to indemnify, defend and hold harmless PARVE and our parent, subsidiaries, affiliates,
                partners, officers, directors, agents, contractors, licensors, service providers, subcontractors,
                suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys'
                fees, made by any third-party due to or arising out of your breach of these Terms of Service or the
                documents they incorporate by reference, or your violation of any law or the rights of a third-party.
              </p>

              <h4 className="font-semibold text-foreground">Section 15 – Severability</h4>
              <p>
                In the event that any provision of these Terms of Service is determined to be unlawful, void or
                unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by
                applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service,
                such determination shall not affect the validity and enforceability of any other remaining provisions.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Return Policy */}
          <AccordionItem value="return" className="bg-card rounded-xl px-6 shadow-soft border-none">
            <AccordionTrigger className="text-lg font-serif font-semibold hover:no-underline">
              Return & Refund Policy
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <p>
                Return requests must be raised within <strong>7 days</strong> of receiving the order.
              </p>

              <h4 className="font-semibold text-foreground">Eligibility</h4>
              <p>
                To be eligible for a return, your item must be in the same condition that you received it —
                unworn or unused, with tags, and in its original packaging. You'll also need the receipt or
                proof of purchase.
              </p>

              <h4 className="font-semibold text-foreground">How to Start a Return</h4>
              <p>
                To start a return, contact us at{" "}
                <a href="mailto:parve.world5@gmail.com" className="underline">parve.world5@gmail.com</a>.
                Returns will need to be sent to the following address:
              </p>
              <p className="pl-4 border-l-2 border-muted">
                151/a, Dream Valley, Road No 4, Mallampet, 500090, Hyderabad, TS, 500090, India
              </p>
              <p>
                If your return is accepted, we'll send you a return shipping label as well as instructions
                on how and where to send your package. Items sent back to us without first requesting a
                return will not be accepted. Please note that if your country of residence is not India,
                shipping your goods may take longer than expected.
              </p>

              <h4 className="font-semibold text-foreground">Damages and Issues</h4>
              <p>
                Please inspect your order upon receipt and contact us immediately if the item is defective,
                damaged, or if you receive the wrong item, so that we may evaluate the issue and make it
                right.
              </p>

              <h4 className="font-semibold text-foreground">Non-Returnable Items</h4>
              <p>
                Certain types of items cannot be returned, such as perishable goods (e.g. food, flowers, or
                plants), custom products (e.g. special orders or personalized items), and personal care goods
                (e.g. beauty products). We also do not accept returns for hazardous materials, flammable
                liquids, or gases. Please get in touch if you have questions or concerns about your specific
                item.
              </p>
              <p>Unfortunately, we cannot accept returns on sale items or gift cards.</p>

              <h4 className="font-semibold text-foreground">Exchanges</h4>
              <p>
                The fastest way to ensure you get what you want is to return the item you have, and once the
                return is accepted, make a separate purchase for the new item.
              </p>

              <h4 className="font-semibold text-foreground">European Union – 3-Day Cooling-Off Period</h4>
              <p>
                Notwithstanding the above, if merchandise is being shipped into the European Union, you have
                the right to cancel or return your order within <strong>3 days</strong> for any reason and
                without justification. Your item must be in the same condition that you received it —
                unworn or unused, with tags, and in its original packaging. You'll also need the receipt or
                proof of purchase.
              </p>

              <h4 className="font-semibold text-foreground">Refunds</h4>
              <p>
                We will notify you once we've received and inspected your return to let you know if the
                refund was approved or not. If approved, you'll be automatically refunded on your original
                payment method within <strong>10 business days</strong>. Please remember it can take some
                time for your bank or credit card company to process and post the refund too.
              </p>
              <p>
                If more than 15 business days have passed since we've approved your return, please contact
                us at{" "}
                <a href="mailto:parve.world5@gmail.com" className="underline">parve.world5@gmail.com</a>.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Privacy Policy */}
          <AccordionItem value="privacy" id="privacy" className="bg-card rounded-xl px-6 shadow-soft border-none">
            <AccordionTrigger className="text-lg font-serif font-semibold hover:no-underline">
              Privacy Policy
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <p>
                This Privacy Policy describes how PARVE (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from the Site or otherwise communicate with us (collectively, the "Services"). For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy.
              </p>
              <p>
                Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree to this Privacy Policy, please do not use or access any of the Services.
              </p>

              <h4 className="font-semibold text-foreground uppercase tracking-wide">Changes to This Privacy Policy</h4>
              <p>
                We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on the Site, update the "Last updated" date and take any other steps required by applicable law.
              </p>

              <h4 className="font-semibold text-foreground uppercase tracking-wide">How We Collect and Use Your Personal Information</h4>
              <p>
                To provide the Services, we collect and have collected over the past 12 months personal information about you from a variety of sources, as set out below. The information that we collect and use varies depending on how you interact with us.
              </p>
              <p>
                In addition to the specific uses set out below, we may use information we collect about you to communicate with you, provide the Services, comply with any applicable legal obligations, enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.
              </p>

              <h4 className="font-semibold text-foreground uppercase tracking-wide">What Personal Information We Collect</h4>
              <p>
                The types of personal information we obtain about you depends on how you interact with our Site and use our Services. When we use the term "personal information", we are referring to information that identifies, relates to, describes or can be associated with you. The following sections describe the categories and specific types of personal information we collect.
              </p>

              <h5 className="font-semibold text-foreground">Information We Collect Directly from You</h5>
              <p>Information that you directly submit to us through our Services may include:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Basic contact details including your name, address, phone number, email.</li>
                <li>Order information including your name, billing address, shipping address, payment confirmation, email address, phone number.</li>
                <li>Account information including your username, password, security questions.</li>
                <li>Shopping information including the items you view, put in your cart or add to your wishlist.</li>
                <li>Customer support information including the information you choose to include in communications with us.</li>
              </ul>
              <p>
                Some features of the Services may require you to directly provide us with certain information about yourself. You may elect not to provide this information, but doing so may prevent you from using or accessing these features.
              </p>

              <h5 className="font-semibold text-foreground">Information We Collect through Cookies</h5>
              <p>
                We also automatically collect certain information about your interaction with the Services ("Usage Data"). To do this, we may use cookies, pixels and similar technologies ("Cookies"). Usage Data may include information about how you access and use our Site and your account, including device information, browser information, information about your network connection, your IP address and other information regarding your interaction with the Services.
              </p>

              <h5 className="font-semibold text-foreground">Information We Obtain from Third Parties</h5>
              <p>Finally, we may obtain information about you from third parties, including from vendors and service providers who may collect information on our behalf, such as:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Companies who support our Site and Service.</li>
                <li>Our payment processors, who collect payment information to process your payment in order to fulfill your orders and perform our contract with you.</li>
                <li>Third parties we work with who may automatically collect certain information using online tracking technologies such as pixels, web beacons, and cookies.</li>
              </ul>
              <p>
                Any information we obtain from third parties will be treated in accordance with this Privacy Policy. We are not responsible or liable for the accuracy of the information provided to us by third parties and are not responsible for any third party's policies or practices.
              </p>

              <h4 className="font-semibold text-foreground uppercase tracking-wide">How We Use Your Personal Information</h4>
              <ul className="space-y-4">
                <li>
                  <strong>Providing Products and Services.</strong> We use your personal information to provide you with the Services in order to perform our contract with you, including to process your payments, fulfill your orders, to send notifications to you related to you account, purchases, returns, exchanges or other transactions, to create, maintain and otherwise manage your account, to arrange for shipping, facilitate any returns and exchanges and to enable you to post reviews.
                </li>
                <li>
                  <strong>Marketing and Advertising.</strong> We use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you advertisements for products or services. This may include using your personal information to better tailor the Services and advertising on our Site and other websites.
                </li>
                <li>
                  <strong>Security and Fraud Prevention.</strong> We use your personal information to detect, investigate or take action regarding possible fraudulent, illegal or malicious activity. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe.
                </li>
                <li>
                  <strong>Communicating with you.</strong> We use your personal information to provide you with customer support and improve our Services. This is in our legitimate interests in order to be responsive to you, to provide effective services to you, and to maintain our business relationship with you.
                </li>
              </ul>

              <h4 className="font-semibold text-foreground uppercase tracking-wide">Cookies</h4>
              <p>
                Most browsers automatically accept Cookies by default, but you can choose to set your browser to remove or reject Cookies through your browser controls. Please keep in mind that removing or blocking Cookies can negatively impact your user experience and may cause some of the Services, including certain features and general functionality, to work incorrectly or no longer be available.
              </p>

              <h4 className="font-semibold text-foreground uppercase tracking-wide">How We Disclose Personal Information</h4>
              <p>
                In certain circumstances, we may disclose your personal information to third parties for legitimate purposes subject to this Privacy Policy. Such circumstances may include:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>With vendors or other third parties who perform services on our behalf (e.g., IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).</li>
                <li>When you direct, request us or otherwise consent to our disclosure of certain information to third parties.</li>
                <li>With our affiliates or otherwise within our corporate group, in our legitimate interests to run a successful business.</li>
                <li>In connection with a business transaction such as a merger or bankruptcy, or to comply with any applicable legal obligations.</li>
              </ul>
              <p>
                We have, in the past 12 months disclosed categories of personal information including Identifiers, Commercial information, and Internet or other similar network activity to vendors, service providers, business partners and affiliates.
              </p>

              <h4 className="font-semibold text-foreground uppercase tracking-wide">User Generated Content</h4>
              <p>
                The Services may enable you to post product reviews and other user-generated content. If you choose to submit user generated content to any public area of the Services, this content will be public and accessible by anyone.
              </p>
              <p>
                We do not control who will have access to the information that you choose to make available to others, and cannot ensure that parties who have access to such information will respect your privacy or keep it secure.
              </p>

              <h4 className="font-semibold text-foreground uppercase tracking-wide">Third Party Websites and Links</h4>
              <p>
                Our Site may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Terms;
