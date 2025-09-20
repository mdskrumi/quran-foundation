import { Code2, Github, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-2xl py-10">
      <h1 className="mb-8 text-center text-4xl font-bold">Contact</h1>

      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-lg">
          <p className="flex items-center gap-2">
            <MapPin className="text-primary h-5 w-5" />
            Dhaka, Bangladesh
          </p>

          <p className="flex items-center gap-2">
            <Mail className="text-primary h-5 w-5" />
            <a href="mailto:mdskrumi@gmail.com" className="text-primary hover:underline">
              mdskrumi@gmail.com
            </a>
          </p>

          <p className="flex items-center gap-2">
            <Phone className="text-primary h-5 w-5" />
            <a href="tel:+8801686382343" className="text-primary hover:underline">
              +8801686382343
            </a>
            <Link href="https://wa.me/8801686382343" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">
              <MessageCircle className="inline-block h-5 w-5" />
            </Link>
          </p>

          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <Github className="text-primary h-5 w-5" />
              <Link href="https://github.com/mdskrumi" className="text-primary hover:underline">
                github.com/mdskrumi
              </Link>
            </p>
            <p className="flex items-center gap-2">
              <Linkedin className="text-primary h-5 w-5" />
              <Link href="https://linkedin.com/in/mdskrumi" className="text-primary hover:underline">
                linkedin.com/in/mdskrumi
              </Link>
            </p>
            <p className="flex items-center gap-2">
              <Code2 className="text-primary h-5 w-5" />
              <Link href="https://hackerrank.com/mdskrumi" className="text-primary hover:underline">
                hackerrank.com/mdskrumi
              </Link>
            </p>
            <p className="flex items-center gap-2">
              <Code2 className="text-primary h-5 w-5" />
              <Link href="https://leetcode.com/mdskrumi" className="text-primary hover:underline">
                leetcode.com/mdskrumi
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
