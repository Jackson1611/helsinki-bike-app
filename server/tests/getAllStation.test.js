const db = require("../db/dbconfig");
const { getAllStations } = require("../controllers/station");
const { mockRequest, mockResponse } = require("jest-mock-req-res");

const req = mockRequest();
const res = mockResponse();

describe("getAllStations function", () => {
  it("should return all stations from database with a success status of 200", async () => {
    db.query = jest.fn().mockReturnValueOnce({
      rows: [
        { id: 1, name: "Station 1" },
        { id: 2, name: "Station 2" },
      ],
    });

    await getAllStations(req, res);

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
    db.query = jest.fn().mockImplementationOnce(() => {
      throw new Error("Internal Server Error");
    });

    await getAllStations(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal Server Error",
    });
  });
});
