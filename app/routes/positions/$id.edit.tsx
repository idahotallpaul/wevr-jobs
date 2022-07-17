import type { Position } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AddEditPosition } from "~/components/AddEditPosition";

type LoaderData = { position: Position };

// load the position data
export async function loader({ params }: any) {
  const prisma = new PrismaClient();
  const position = await prisma.position.findUnique({
    where: {
      id: params?.id,
    },
  });

  await prisma.$disconnect();
  return { position };
}

// submit the modified post data
export async function action({ request }: any) {
  const form = await request.formData();
  const prisma = new PrismaClient();

  const newPosition = await prisma.position.update({
    where: { id: form.get("id") },
    data: {
      name: form.get("name"),
      details: form.get("details"),
    },
  });

  await prisma.$disconnect();

  return redirect(`/positions/${newPosition.id}`);
}

export default function EditPositionRoute() {
  const { position } = useLoaderData<LoaderData>();

  return <AddEditPosition position={position} />;
}
