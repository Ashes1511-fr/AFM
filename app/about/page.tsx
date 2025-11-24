import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'About Us - AffiliateHub',
  description: 'Learn more about AffiliateHub and our mission to bring you the best deals and products online.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About AffiliateHub
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're passionate about helping you discover amazing products and deals from trusted brands and retailers.
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 text-lg leading-relaxed text-center">
              At AffiliateHub, our mission is to make online shopping easier and more rewarding. 
              We curate the best products from trusted brands and retailers, ensuring you get 
              the best deals without the hassle of endless searching.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* What We Do */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          What We Do
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                🔍 Product Curation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                We carefully select and review products to ensure we only recommend 
                high-quality items that offer real value to our customers.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                💰 Best Deals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                We work with retailers to bring you exclusive discounts and deals 
                that you won't find anywhere else.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                🔒 Trusted Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Our team provides honest, unbiased reviews to help you make 
                informed purchasing decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Why Choose AffiliateHub?
        </h2>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">✅</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Quality Assurance</h3>
                  <p className="text-gray-600">
                    Every product we feature goes through our rigorous quality check process. 
                    We only recommend products we would use ourselves.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">🚀</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Always Up-to-Date</h3>
                  <p className="text-gray-600">
                    Our team constantly monitors prices and availability to ensure 
                    all deals are current and valid when you click them.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="text-2xl">👥</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Customer First</h3>
                  <p className="text-gray-600">
                    Your satisfaction is our priority. We're always here to help 
                    and answer any questions you might have.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="mb-16">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-blue-900">
              Transparency & Trust
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-800 space-y-4">
              <p>
                <strong>Affiliate Disclosure:</strong> AffiliateHub is supported by affiliate partnerships. 
                When you purchase products through our links, we may earn a commission at no extra cost to you.
              </p>
              <p>
                This helps us keep our service free and continue providing you with the best deals. 
                Our affiliate relationships never influence our product recommendations - we only promote 
                products we genuinely believe in.
              </p>
              <p>
                We believe in complete transparency, which is why we clearly mark all affiliate links 
                and always disclose our partnerships.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Ready to Start Shopping?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of happy customers who trust AffiliateHub for their online shopping needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/products">
              Browse Products
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">
              Contact Us
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}