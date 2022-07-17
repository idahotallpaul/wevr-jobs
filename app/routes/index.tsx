import type { Key } from "react";
import { PrismaClient } from "@prisma/client";
import { Link, useLoaderData } from "@remix-run/react";
import { Button, Card, Col, Row } from "react-bootstrap";
import type { PositionWithOffers } from "../utils/types";

// load all positions
export async function loader() {
  const prisma = new PrismaClient();
  const allPositions = await prisma.position.findMany({
    include: {
      offers: true,
    },
  });
  await prisma.$disconnect();
  return { allPositions };
}

export default function Index() {
  const data = useLoaderData();
  const { allPositions } = data;

  const positionCards = allPositions.map(
    (position: PositionWithOffers, positionId: Key) => (
      <Col key={positionId} className="col-4 mb-3">
        <Card className="h-100">
          <Card.Body
            as={Link}
            to={`/positions/${position.id}`}
            className="d-flex flex-column justify-content-between"
          >
            <Card.Title>{position.name}</Card.Title>
            {!!position.offers.length && (
              <div>
                <span className="badge rounded-pill bg-info d-inline-block ms-auto">
                  {`${position.offers.length} Offers`}
                </span>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    )
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Positions</h1>
        <Link to={"positions/new"}>
          <Button variant="primary">Add New Position</Button>
        </Link>
      </div>
      <Row className=" gx-3">{positionCards}</Row>
    </>
  );
}
