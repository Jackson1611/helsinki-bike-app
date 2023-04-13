const db = require("../db/dbconfig");
const { getAllStations } = require("../controllers/station");
const { mockRequest, mockResponse } = require("jest-mock-req-res");

// Mocked request and response objects
const req = mockRequest();
const res = mockResponse();

// Test getAllStations function
describe("getAllStations function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all stations from database with a success status of 200", async () => {
    // Mock query function from db module to return expected result
    db.query = jest.fn().mockReturnValueOnce({
      rows: [
        { id: 1, name: "Station 1" },
        { id: 2, name: "Station 2" },
      ],
    });

    await getAllStations(req, res);

    // Check if the response has the correct status and json
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      stations: [
        { id: 1, name: "Station 1" },
        { id: 2, name: "Station 2" },
      ],
    });
  });

  it("should return an error response with status 500 if there is an error in the try block", async () => {
    // Mock query function from db module to throw an error
    db.query = jest.fn().mockImplementationOnce(() => {
      throw new Error("Internal Server Error");
    });

    await getAllStations(req, res);

    // Check if the response has the correct status and json
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal Server Error",
    });
  });
});
