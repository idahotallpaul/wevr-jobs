import { PrismaClient } from "@prisma/client";
import { redirect } from "@remix-run/node";
import { AddEditPosition } from "~/components/AddEditPosition";

// create a new position based on the AddEditPosition form data
export async function action({ request }: any) {
  const form = await request.formData();

  const prisma = new PrismaClient();
  const newPosition = await prisma.position.create({
    data: {
      name: form.get("name"),
      details: form.get("details"),
    },
  });

  await prisma.$disconnect();
  return redirect(`/positions/${newPosition.id}`);
}

export default function NewPositionRoute() {
  return <AddEditPosition />;
}
