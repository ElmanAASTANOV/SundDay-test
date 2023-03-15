import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../test/test-utils";
import Campaigns from "../Campaigns";
import campaignsMockData from "../../test/mocks/campaigns";

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.get(
    "http://5c3db915a9d04f0014a98a79.mockapi.io/campaigns",
    (req, res, ctx) => {
      return res(ctx.json(campaignsMockData));
    },
  ),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Campaign page should fetch campaign data when redirected", async () => {
  renderWithProviders(<Campaigns />);

  expect(screen.getByText("Loading data....")).toBeInTheDocument();
  expect(await screen.findByText(/saturday/i)).toBeInTheDocument();
});
