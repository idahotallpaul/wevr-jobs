import type { Position } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import {
  Button,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
} from "react-bootstrap";

type LoaderData = { position: Position };

export async function loader({ params }: any) {
  const prisma = new PrismaClient();

  // get the position
  const position = await prisma.position.findUnique({
    where: {
      id: params?.id,
    },
  });

  await prisma.$disconnect();
  return { position };
}

export async function action({ request }: any) {
  const form = await request.formData();

  const prisma = new PrismaClient();
  const newPosition = await prisma.position.update({
    where: { id: form.get("id") },
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

  const { position } = useLoaderData<LoaderData>();

  const busy = state === "submitting";

  return (
    <Form method="post">
      <input type="text" hidden name="id" defaultValue={position.id} />
      <FormGroup className="mb-3" controlId="formBasicEmail">
        <FormLabel>Position Name</FormLabel>
        <FormControl
          name="name"
          placeholder="Position Name"
          defaultValue={position.name}
        />
      </FormGroup>

      <FormGroup className="mb-3" controlId="formBasicPassword">
        <FormLabel>Password</FormLabel>
        <FormControl
          as="textarea"
          rows={20}
          name="details"
          placeholder="Position Details"
          defaultValue={position.details}
        />
      </FormGroup>
      <Button variant="primary" type="submit" disabled={busy}>
        {busy ? "Updating..." : "Update Position"}
      </Button>
    </Form>
  );
}
