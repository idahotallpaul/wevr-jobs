import { Prisma } from "@prisma/client";

// linked data does not show up with the auto type checking so
// if you want to pull and process it, you have to create a new type
// that includes that linked data.
const positionWithOffers = Prisma.validator<Prisma.PositionArgs>()({
  include: { offers: true },
});

export type PositionWithOffers = Prisma.PositionGetPayload<
  typeof positionWithOffers
>;
