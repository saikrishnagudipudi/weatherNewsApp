export const getNews = async (
  country: string = 'us',
  category: string = 'general',
  temperature: number
) => {
  const categoryToSubreddit: Record<string, string> = {
    general: 'news',
    depressing: 'depression',
    fear: 'creepy',
    winning: 'UpliftingNews',
  };
  let subreddit = categoryToSubreddit[category.toLowerCase()] || '';

  if (!subreddit) {
    if (temperature < 10) subreddit = 'depression';
    else if (temperature > 30) subreddit = 'creepy';
    else subreddit = 'UpliftingNews';
  }

  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    return json.data.children.map((post: any) => ({
      title: post.data.title,
      description: post.data.selftext || '',
      url: post.data.url,
    }));
  } catch (error) {
    console.error('News fetch error:', error);
    return [];
  }
};
