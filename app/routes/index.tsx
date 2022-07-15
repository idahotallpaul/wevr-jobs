import type { Position, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { Key } from "react";
import { Form, Link, useLoaderData, useTransition } from "@remix-run/react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export async function loader() {
  const prisma = new PrismaClient();
  const fetchPositions = prisma.position.findMany();
  const fetchOffers = prisma.offer.findMany();

  const [allPositions, allOffers] = await Promise.all([
    fetchPositions,
    fetchOffers,
  ]);

  await prisma.$disconnect();
  return [allPositions, allOffers];
}

export default function Index() {
  const data = useLoaderData();
  console.log({ data });
  const [positions, offers] = data;
  console.log({ positions, offers });

  // const { state } = useTransition();
  // const busy = state === "submitting";

  return (
    <>
      <h4 className="d-flex justify-content-between">
        Positions
        <Link to={"positions/new"}>
          <Button variant="primary">Add New Position</Button>
        </Link>
      </h4>
      <Row className=" gx-3">
        {positions.map((position: Position, positionId: Key) => (
          <Col key={positionId} className="col-4 mb-3">
            <Card className="h-100">
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title>{position.name}</Card.Title>
                {/* <Card.Text>{position.details}</Card.Text> */}
                <Link
                  to={`/positions/${position.id}`}
                  className="d-inline-block align-self-end"
                >
                  <Button variant="primary">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {offers.map((offer: Position, offerId: Key) => (
        <div
          key={offerId}
          style={{ border: "1px solid grey", padding: 6, margin: 8 }}
        >
          <div>{offer.name}</div>
          <div>
            <pre>{offer.details}</pre>
          </div>
          <div>
            <Link to={`/offers/${offer.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
