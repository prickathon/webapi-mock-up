import { Router } from "express";
import Sparql from "../middleware/sparqle"
import { sortInstanceList } from '../middleware/util'

const router = Router();

const className = `Series`
const arrayParameters = {
    'hasEpisode': 'episodes'
}
const sortBy = []

router.get("/", async (req, res) => {
    const results = await Sparql.getInstanceList(className, arrayParameters)
    const sortedResults = sortInstanceList(results, sortBy)
    res.json({
        results: sortedResults
    })
})

router.get("/:key", async (req, res) => {
    const key = req.params.key
    const properties = await Sparql.getInstance(key, className, arrayParameters)
    res.json(properties)
})

export default router;
