import { PrismaClient } from "@prisma/client";
import { redirect } from "@remix-run/node";
import { Form, useTransition } from "@remix-run/react";

export async function action({ request }: any) {
  const form = await request.formData();

  const prisma = new PrismaClient();
  const newPosition = await prisma.position.create({
    data: {
      name: form.get("name"),
      details: form.get("details"),
      // user: {
      //   connect: {
      //     id: form.get("user"),
      //   },
      // },
    },
  });

  console.log(newPosition);

  await prisma.$disconnect();
  // return true;
  return redirect(`/positions/${newPosition.id}`);
}

export default function NewPositionRoute() {
  const { state } = useTransition();
  const busy = state === "submitting";

  return (
    <Form method="post">
      {/* <input name="user" type="text" hidden defaultValue={users[0].id} /> */}
      <div>
        <input name="name" placeholder="Position Name" />
      </div>
      <div>
        <textarea name="details" placeholder="Position Details" />
      </div>
      <button type="submit" disabled={busy}>
        {busy ? "Creating..." : "Create New Position"}
      </button>
    </Form>
  );
}
