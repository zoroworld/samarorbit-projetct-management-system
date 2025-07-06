import { getAllStatsService } from "../services/viewService.js";

export const getAllStatsController = async (req, res) => {
  try {
    const stats = await getAllStatsService();

    res.status(200).json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching stats' });
  }
};
