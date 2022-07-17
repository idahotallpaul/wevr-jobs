import type { Position } from "@prisma/client";
import { useTransition } from "@remix-run/react";
import { marked } from "marked";
import type { ChangeEvent } from "react";
import { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Nav,
  Tab,
} from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import { jobDefaults } from "~/utils/job-defaults";

type AddEditPositionProps = {
  position?: Position | any;
};

// common form for adding/editing positions
export const AddEditPosition = (props: AddEditPositionProps) => {
  const { position } = props;

  const { state } = useTransition();
  const busy = state === "submitting";

  // if we don't have an id, we're creating a new position, not editing an old one
  const newPosition = !position?.id;

  // common object to store local form data so we can render a preview of the markdown
  const [positionData, setPositionData] = useState({
    name: position?.name || "New Position Name",
    details: position?.details || jobDefaults,
  });

  // common handler for all inputs
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let updatedValue = {};
    updatedValue = { [event.target.name]: event.target.value };
    setPositionData((previousData) => ({
      ...previousData,
      ...updatedValue,
    }));
  };

  // convert markdown content to html to be rendered
  const detailsMarkdownToHtml = position?.details
    ? marked(position.details)
    : "";

  // button text needs to change based on both new vs edit and busy vs not busy
  let buttonText;
  if (newPosition) {
    buttonText = busy ? "Creatating..." : "Create Position";
  } else {
    buttonText = busy ? "Updating..." : "Update Position";
  }

  const headingText = newPosition ? "Add Position" : "Edit Position";

  return (
    <Form method="post">
      <input
        type="text"
        hidden
        name="id"
        defaultValue={position?.id || undefined}
      />
      <Tab.Container defaultActiveKey="markdown" id="job-details">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>{headingText}</h1>
          <Nav variant="tabs" className="">
            <Nav.Item>
              <Nav.Link eventKey="markdown" title="Markdown">
                Markdown
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="preview" title="preview">
                Preview
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <Tab.Content>
          <Tab.Pane eventKey="markdown">
            <FormGroup className="mb-3" controlId="name">
              <FormLabel>Position Name</FormLabel>
              <FormControl
                name="name"
                placeholder="Position Name"
                size="lg"
                defaultValue={positionData.name}
                onChange={(event) => handleInputChange(event)}
              />
            </FormGroup>

            <FormGroup className="mb-3" controlId="details">
              <FormLabel>Job Details</FormLabel>
              <FormControl
                as={TextareaAutosize}
                rows={20}
                name="details"
                placeholder="Position Details"
                defaultValue={positionData.details}
                onChange={(event) => handleInputChange(event)}
              />
            </FormGroup>
          </Tab.Pane>

          <Tab.Pane eventKey="preview">
            <h1>{positionData.name}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: detailsMarkdownToHtml }}
            ></div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      <Button variant="primary" type="submit" disabled={busy}>
        {buttonText}
      </Button>
    </Form>
  );
};
