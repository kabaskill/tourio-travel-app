import dbConnect from "@/db/connect.js";
import Place from "@/db/models/Place.js";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }

    response.status(200).json(place);
  }

  if (request.method === "PATCH") {
    const updatedPlace = request.body;
    console.log("🚀  updatedPlace:", updatedPlace);
    await Place.findByIdAndUpdate(id, updatedPlace);
    response.status(200).json({ Status: "Place succesfully updated" });
  }

  if (request.method === "DELETE") {
    const updatedPlace = request.body;
    await Place.findByIdAndDelete(id, updatedPlace);
    response.status(200).json({ Status: "Place succesfully deleted" });
  }
}
