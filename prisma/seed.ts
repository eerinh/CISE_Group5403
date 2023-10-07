import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const articles = [
    {
      title: "Sample Article Title",
      author: "John Doe",
      date: new Date(),
      journal_name: "Journal of Sample Articles",
      se_practice: "TDD",
      claim: "Sample Claim",
      result_of_evidence: "Sample Result of Evidence",
      type_of_research: "Sample Type of Research",
      type_of_participant: "Sample Type of Participant",
      approved: true,
      checked: true,
    },
    {
      title: "Sample Article Title 2",
      author: "John Doe",
      date: new Date(),
      journal_name: "Journal of Sample Articles",
      se_practice: "TDD",
      claim: "Sample Claim",
      result_of_evidence: "Sample Result of Evidence",
      type_of_research: "Sample Type of Research",
      type_of_participant: "Sample Type of Participant",
      approved: false,
      checked: false,
    },
    {
      title: "Effective SE Practices in Modern Web Development",
      author: "John Doe",
      date: new Date("2021-01-01"),
      journal_name: "Journal of Software Engineering",
      se_practice: "Continuous Integration",
      claim: "Improves Deployment Frequency",
      result_of_evidence: "Strongly Supportive",
      type_of_research: "Empirical Study",
      type_of_participant: "Professional Developers",
      approved: true,
      checked: true,
    },
    {
      title: "Agile vs Waterfall: A Comparative Analysis",
      author: "Alice Waters",
      date: new Date("2019-05-15"),
      journal_name: "Software Design Monthly",
      se_practice: "Agile Development",
      claim: "Enhances Collaboration",
      result_of_evidence: "Moderately Supportive",
      type_of_research: "Case Study",
      type_of_participant: "Software Engineers",
      approved: false,
      checked: false,
    },
    {
      title: "The Impact of Pair Programming on Software Quality",
      author: "Bob Ross",
      date: new Date("2020-10-01"),
      journal_name: "Journal of Software Engineering",
      se_practice: "Pair Programming",
      claim: "Improves Code Quality",
      result_of_evidence: "Strongly Supportive",
      type_of_research: "Empirical Study",
      type_of_participant: "Professional Developers",
      approved: true,
      checked: true,
    },
    {
      title: "Impact of TDD on Software Defect Rates",
      author: "Robert Smith",
      date: new Date("2020-12-10"),
      journal_name: "Testing Times Journal",
      se_practice: "Test-Driven Development",
      claim: "Reduces Bugs and Defects",
      result_of_evidence: "Strongly Supportive",
      type_of_research: "Empirical Study",
      type_of_participant: "QA Engineers",
      approved: true,
      checked: false,
    },
  ];

  for (const article of articles) {
    await prisma.article.create({
      data: article,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
