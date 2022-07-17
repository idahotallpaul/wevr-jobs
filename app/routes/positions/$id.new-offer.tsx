import type { Position } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import { marked } from "marked";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";

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

// submit the post data
export async function action({ request }: any) {
  const form = await request.formData();
  const prisma = new PrismaClient();

  const newOffer = await prisma.offer.create({
    data: {
      candidateName: form.get("candidateName"),
      candidateEmail: form.get("candidateEmail"),
      details: form.get("details"),
      positionId: form.get("positionId"),
    },
  });

  await prisma.$disconnect();

  return redirect(`/offers/${newOffer.id}`);
}

export default function NewPositionOfferRoute() {
  const { position } = useLoaderData<LoaderData>();

  const { state } = useTransition();
  const busy = state === "submitting";

  const detailsMarkdownToHtml = marked(position.details);

  return (
    <>
      <h1>{position.name}</h1>

      <Form method="post">
        <input
          type="text"
          hidden
          name="positionId"
          defaultValue={position.id}
        />
        <FormGroup className="mb-3" controlId="formBasicEmail">
          <FormLabel>Offer Recipient Name</FormLabel>
          <FormControl
            name="candidateName"
            placeholder="Offer Recipient Name"
            required
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="formBasicEmail">
          <FormLabel>Offer Recipient Email</FormLabel>
          <FormControl
            name="candidateEmail"
            type="email"
            placeholder="Offer Recipient Email"
            required
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="formBasicEmail">
          <FormLabel>Offer Details</FormLabel>
          <FormControl name="details" placeholder="Offer Details" required />
        </FormGroup>

        <Button variant="primary" type="submit" disabled={busy}>
          {busy ? "Submitting..." : "Submit Offer"}
        </Button>
      </Form>

      <hr />

      <div className="mt-3">
        <h6>Details</h6>
        <div dangerouslySetInnerHTML={{ __html: detailsMarkdownToHtml }}></div>
      </div>
    </>
  );
}
