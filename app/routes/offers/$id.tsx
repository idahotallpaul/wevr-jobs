import { PrismaClient } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import { Col, Row } from "react-bootstrap";

export async function loader({ params }: any) {
  const prisma = new PrismaClient();

  // get the offer
  const offer = await prisma.offer.findUnique({
    where: {
      id: params?.id,
    },
  });

  // get the position
  const position = await prisma.position.findUnique({
    where: {
      id: offer?.positionId,
    },
  });

  await prisma.$disconnect();
  return { offer, position };
}

export default function OfferRoute() {
  const data = useLoaderData();
  const { offer, position } = data;
  const detailsMarkdownToHtml = marked(position.details);

  return (
    <Row>
      <Col lg={8}>
        <h1>Hello there!</h1>

        <h2>We've got good news! Wevr would like to make you an offer!</h2>

        <h5>
          (Just to make sure we're clear, this offer is intended for{" "}
          <strong className="text-info">{offer.candidateName}</strong>, who is
          reachable at the following email address:{" "}
          <strong>
            <a href={`mailto:${offer.candidateEmail}`}>
              {offer.candidateEmail}
            </a>
          </strong>
          .)
        </h5>

        <hr />

        <h2>The position we're offering you a job for, as you recall, is:</h2>
        <h2 className="fs-1 text-info fw-bolder">{position.name}</h2>

        <hr />

        <h2>
          For this role, we're prepared to offer you the following compensation:{" "}
        </h2>
        <h2 className="fs-1 text-info fw-bolder">{offer.details}</h2>

        <hr />

        <h5>
          Pretty sweet, huh? In case you've forgotten what the role is all
          about, the details are right here. Let us know within the next couple
          days! Excited to welcome you aboard!
        </h5>

        <hr />

        <h1>{position.name}</h1>
        <div dangerouslySetInnerHTML={{ __html: detailsMarkdownToHtml }}></div>
      </Col>
    </Row>
  );
}
