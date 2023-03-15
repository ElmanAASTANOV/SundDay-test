import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen } from "@testing-library/react";

import renderWithProviders from "../../test/test-utils";
import Campaigns from ".";
import campaignsMockData from "../../test/mocks/campaigns";

const handlers = [
  rest.get(
    "http://5c3db915a9d04f0014a98a79.mockapi.io/campaigns",
    async (req, res, ctx) => {
      return await res(ctx.json(campaignsMockData));
    },
  ),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

test("Campaign page should fetch campaign data when redirected", async () => {
  renderWithProviders(<Campaigns />);

  expect(screen.getByText("Loading data....")).toBeInTheDocument();
  expect(await screen.findByText(/saturday/i)).toBeInTheDocument();
});
