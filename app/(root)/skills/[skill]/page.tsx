import { Metadata } from "next";
import { notFound } from "next/navigation";
import { skills } from "@/config/skills";
import { Projects } from "@/config/projects";
import { experiences } from "@/config/experience";
import { siteConfig } from "@/config/site";
import PageContainer from "@/components/common/page-container";
import PageHeader from "@/components/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Chip from "@/components/ui/chip";

interface SkillPageProps {
  params: Promise<{ skill: string }>;
}

// Generate static params for all skills
export async function generateStaticParams() {
  return skills.map((skill) => ({
    skill: skill.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: SkillPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const skillName = resolvedParams.skill
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const skill = skills.find(
    (s) => s.name.toLowerCase() === skillName.toLowerCase()
  );

  if (!skill) {
    return {
      title: "Skill Not Found",
      description: "The requested skill could not be found.",
    };
  }

  return {
    title: `${skill.name} Development Services | ${siteConfig.name}`,
    description: `Expert ${skill.name} development services. ${skill.description} View my ${skill.name} projects, experience, and code samples.`,
    keywords: [
      skill.name,
      `${skill.name} Developer`,
      `${skill.name} Development`,
      `${skill.name} Engineer`,
      `${skill.name} Expert`,
      ...siteConfig.keywords,
    ],
    openGraph: {
      title: `${skill.name} Development Services | ${siteConfig.name}`,
      description: `Expert ${skill.name} development services. ${skill.description}`,
      type: "website",
    },
  };
}

export default async function SkillPage({ params }: SkillPageProps) {
  const resolvedParams = await params;
  const skillName = resolvedParams.skill
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const skill = skills.find(
    (s) => s.name.toLowerCase() === skillName.toLowerCase()
  );

  if (!skill) {
    notFound();
  }

  // Find projects that use this skill
  const skillProjects = Projects.filter((project) =>
    project.techStack.some(
      (tech) => tech.toLowerCase() === skill.name.toLowerCase()
    )
  );

  // Find experience that uses this skill
  const skillExperience = experiences.filter((exp) =>
    exp.skills.some((tech) => tech.toLowerCase() === skill.name.toLowerCase())
  );

  return (
    <PageContainer
      title={skill.name}
      description={skill.description}
    >
      <div className="grid gap-6 mt-8">
        {/* Skill Overview */}
        <Card>
          <CardHeader>
            <CardTitle>About {skill.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{skill.description}</p>
            <div className="mt-4">
              <Chip content={`Proficiency: ${skill.rating}/5`} />
            </div>
          </CardContent>
        </Card>

        {/* Projects using this skill */}
        {skillProjects.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Projects Built with {skill.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {skillProjects.map((project) => (
                  <a
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <h3 className="font-semibold">{project.companyName}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <Chip key={tech} content={tech} />
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Experience using this skill */}
        {skillExperience.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Work Experience with {skill.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillExperience.map((exp) => (
                  <a
                    key={exp.id}
                    href={`/experience/${exp.id}`}
                    className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <h3 className="font-semibold">
                      {exp.position} at {exp.company}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {exp.description[0]}
                    </p>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
