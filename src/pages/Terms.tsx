import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Terms = () => {
  return (
    <div className="py-8 md:py-12">
      <div className="container max-w-4xl">
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
              <p>
                Welcome to PARVE. By accessing and using our website, you agree to comply with and be bound 
                by the following terms and conditions.
              </p>
              <h4 className="font-semibold text-foreground">1. Use of Website</h4>
              <p>
                The content of this website is for your general information and use only. It is subject to 
                change without notice. You may not use our products for any illegal or unauthorized purpose.
              </p>
              <h4 className="font-semibold text-foreground">2. Products</h4>
              <p>
                We strive to display our products as accurately as possible. However, actual product colors 
                may vary slightly from what appears on your screen. All product descriptions are subject to change.
              </p>
              <h4 className="font-semibold text-foreground">3. Pricing</h4>
              <p>
                All prices are listed in Indian Rupees (₹) and are subject to change without notice. We reserve 
                the right to modify or discontinue any product without prior notice.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Refund Policy */}
          <AccordionItem value="refund" id="refund" className="bg-card rounded-xl px-6 shadow-soft border-none">
            <AccordionTrigger className="text-lg font-serif font-semibold hover:no-underline">
              Refund Policy
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <p>
                We want you to be completely satisfied with your purchase. If you're not happy with your 
                order, we're here to help.
              </p>
              <h4 className="font-semibold text-foreground">Eligibility for Refund</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Products must be unused and in their original packaging</li>
                <li>Refund requests must be made within 15 days of delivery</li>
                <li>Products damaged during shipping are eligible for full refund</li>
              </ul>
              <h4 className="font-semibold text-foreground">Processing Time</h4>
              <p>
                Once we receive and inspect your return, we will process your refund within 7-10 business days. 
                The refund will be credited to your original payment method.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* Return Policy */}
          <AccordionItem value="return" className="bg-card rounded-xl px-6 shadow-soft border-none">
            <AccordionTrigger className="text-lg font-serif font-semibold hover:no-underline">
              Return Policy
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <p>
                We accept returns within 15 days of delivery for products that are unopened and in their 
                original condition.
              </p>
              <h4 className="font-semibold text-foreground">How to Return</h4>
              <ol className="list-decimal list-inside space-y-1">
                <li>Contact our support team at parve.world5@gmail.com</li>
                <li>Provide your order number and reason for return</li>
                <li>We will provide you with return shipping instructions</li>
                <li>Pack the product securely and ship it back to us</li>
              </ol>
              <h4 className="font-semibold text-foreground">Non-Returnable Items</h4>
              <p>
                For hygiene reasons, opened or used products cannot be returned unless they are defective 
                or damaged upon arrival.
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
                At PARVE, we are committed to protecting your privacy. This policy explains how we collect, 
                use, and safeguard your personal information.
              </p>
              <h4 className="font-semibold text-foreground">Information We Collect</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Name, email address, phone number, and shipping address</li>
                <li>Payment information (processed securely through our payment partners)</li>
                <li>Order history and preferences</li>
              </ul>
              <h4 className="font-semibold text-foreground">How We Use Your Information</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>To process and fulfill your orders</li>
                <li>To communicate with you about your orders</li>
                <li>To send promotional offers (with your consent)</li>
                <li>To improve our products and services</li>
              </ul>
              <h4 className="font-semibold text-foreground">Data Security</h4>
              <p>
                We implement industry-standard security measures to protect your personal information. 
                Your data is encrypted and stored securely.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Terms;
