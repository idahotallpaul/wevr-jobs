import { redirect } from "@remix-run/node";

// nothing to see here... redirect to the root
export async function loader({ params }: any) {
  return redirect(`/`);
}
