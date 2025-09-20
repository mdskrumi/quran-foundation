import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container mx-auto space-y-10 py-10">
      <h1 className="mb-8 text-center text-4xl font-bold">About Me</h1>

      <section>
        <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed">
          {`With over 5 years of experience in software engineering, I've crafted websites for thousands of daily users. Proficient in JavaScript,
          TypeScript, React.js, Next.js, and Node.js, I tackle complex business problems with clean and reusable code by delivering quality solutions.
          I enjoy collaborating with cross-functional teams to drive innovation.`}
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Professional Experience</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>IQVIA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Software Development Engineer III (Dec 2024 - Present)</p>
              <p>Design, develop, and maintain end-to-end web applications using ReactJS.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Strativ AB</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Senior Software Engineer (Apr 2024 - Dec 2024)</p>
              <p>
                Develop and maintain web applications built with NextJS and Payload CMS. Worked on performance optimization for existing applications.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Brain Station 23 Ltd</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">Software Engineer (Sept 2020 - Apr 2024)</p>
              <p>Designed, developed, and maintained end-to-end web applications using ReactJS, NextJS, NodeJS, ExpressJS, and MongoDB.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Technical Skills</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardContent>
              <p>
                <strong>Languages:</strong> JavaScript, TypeScript, Go, Python
              </p>
              <p>
                <strong>Frameworks:</strong> React.js, Next.js, Express.js, FastAPI, Cypress, Jest, Chi
              </p>
              <p>
                <strong>Databases:</strong> MySQL, Firebase, MongoDB
              </p>
              <p>
                <strong>Frontend:</strong> HTML5, CSS3, TailwindCSS
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Education</h2>
        <Card>
          <CardContent>
            <p>Bachelor of Science in Computer Science and Engineering (2016 – 2020)</p>
            <p>City University, Bangladesh</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Achievements</h2>
        <ul className="list-inside list-disc space-y-2">
          <li>Champion in Intra University Math Olympiad 2019</li>
          <li>4-time Champion in Intra University Programming Contest (2018-2020)</li>
          <li>Programming Mentor, City University Programming Club (CUPC)</li>
          <li>15th Position, UITS Inter-University Programming Contest 2019</li>
          <li>19th Position, AUB Inter-University Programming Contest 2018</li>
        </ul>
      </section>
    </div>
  );
}
