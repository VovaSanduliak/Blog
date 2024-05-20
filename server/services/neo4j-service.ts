import { Record } from "neo4j-driver";
import { getSession } from "../src/config/ConnectToNeo4j";

const addUserToNeo4j = async (userId: string, email: string) => {
  const session = getSession();
  try {
    const result = await session.run(
      "CREATE (u:User {id: $userId, email: $email}) RETURN u",
      { userId, email }
    );
    return result.records[0].get("u");
  } finally {
    await session.close();
  }
};

const addSubscription = async (followerId: string, followeeId: string) => {
  const session = getSession();
  try {
    const result = await session.run(
      "MATCH (follower:User {id: $followerId}), (followee:User {id: $followeeId}) " +
        "CREATE (follower)-[:FOLLOWS]->(followee)",
      { followerId, followeeId }
    );
    return result.summary.counters.updates().relationshipsCreated;
  } finally {
    await session.close();
  }
};

const removeSubscription = async (followerId: string, followeeId: string) => {
  const session = getSession();
  try {
    const result = await session.run(
      "MATCH (follower:User {id: $followerId})-[r:FOLLOWS]->(followee:User {id: $followeeId}) " +
        "DELETE r",
      { followerId, followeeId }
    );
    return result.summary.counters.updates().relationshipsDeleted;
  } finally {
    await session.close();
  }
};

const getSubscribedArticles = async (userId: string) => {
  const session = getSession();
  try {
    const result = await session.run(
      "MATCH (user:User {id: $userId})-[:FOLLOWS]->(author:User)-[:WROTE]->(article:Article) " +
        "RETURN article",
      { userId }
    );
    return result.records.map(
      (record: Record) => record.get("article").properties
    );
  } finally {
    await session.close();
  }
};

const getAuthorArticles = async (authorId: string) => {
  const session = getSession();
  try {
    const result = await session.run(
      "MATCH (author:User {id: $authorId})-[:WROTE]->(article:Article) " +
        "RETURN article",
      { authorId }
    );
    return result.records.map(
      (record: Record) => record.get("article").properties
    );
  } finally {
    await session.close();
  }
};

const addArticleToNeo4j = async (
  articleId: string,
  title: string,
  content: string,
  authorId: string
) => {
  const session = getSession();
  try {
    const result = await session.run(
      "MATCH (author:User {id: $authorId}) " +
        "CREATE (author)-[:WROTE]->(a:Article {id: $articleId, title: $title, content: $content}) " +
        "RETURN a",
      { articleId, title, content, authorId }
    );
    return result.records[0].get("a").properties;
  } finally {
    await session.close();
  }
};

const addSavedArticleToNeo4j = async (userId: string, articleId: string) => {
  const session = getSession();
  try {
    const result = await session.run(
      "MATCH (user:User {id: $userId}), (article:Article {id: $articleId}) " +
        "CREATE (user)-[:SAVED]->(article)",
      { userId, articleId }
    );
    return result.summary.counters.updates().relationshipsCreated;
  } finally {
    await session.close();
  }
};

export default {
  addUserToNeo4j,
  addSubscription,
  removeSubscription,
  getSubscribedArticles,
  getAuthorArticles,
  addArticleToNeo4j,
  addSavedArticleToNeo4j,
};
