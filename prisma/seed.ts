import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.article.create({
    data: {
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
      checked: true
    },
  });
  await prisma.article.create({
    data: {
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
      checked: false
    },
  });
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
