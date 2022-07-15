import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import type { Position } from "@prisma/client";

// import { db } from "~/utils/db.server";
import { PrismaClient } from "@prisma/client";
import { Button } from "react-bootstrap";

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

export default function PositionRoute() {
  const params = useParams();

  const position = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>{position.position.name}</h1>
      <h6>Details</h6>

      <div style={{ whiteSpace: "break-spaces" }}>
        {position.position.details}
      </div>

      <div className="mt-3">
        <Link to="./edit">
          <Button variant="primary">Edit Position</Button>
        </Link>
      </div>
    </div>
  );
}
