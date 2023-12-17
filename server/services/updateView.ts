import { Article } from "../models/Article";
import { View } from "../models/View";

async function updateArticleView(
  clientIp: string | string[],
  articleId: string
) {
  try {
    // Check if the IP has already viewed the article in the last 24 hours
    const lastView = await View.findOne({
      ipAddress: clientIp,
      article: articleId,
      timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    if (!lastView) {
      const newView = new View({
        ipAddress: clientIp,
        article: articleId,
      });
      await newView.save();
      await Article.findByIdAndUpdate(articleId, { $inc: { views: 1 } });
    }
    console.log("views updating");
  } catch (error) {
    console.log("updateArticleView: error", error);
  }
}

export default updateArticleView;
