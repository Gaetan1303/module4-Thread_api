import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface CommentAttributes {
  id: number;
  content: string;
  createdAt: Date;
  userId: number;
  postId: number;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id' | 'createdAt'> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public id!: number;
  public content!: string;
  public createdAt!: Date;
  public userId!: number;
  public postId!: number;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: false,
  }
);

export default Comment;
