import React from "react"
import { Link } from "gatsby"

import "./index.less"

const iconList = ['🦑', '🦐', '🦀', '🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥒', '🌶', '🌽', '🥕', '🥔', '🥐', '🍠', '🍞', '🥖', '🥨', '🧀', '🥚', '🥞', '🥓', '🥩', '🍗', '🍖', '🌭', '🍔', '🍟', '🍕', '🥪', '🌮', '🌯', '🥘', '🥗', '🍝', '🥫', '🥘', '🍜', '🍲', '🍝', '🍛', '🍣', '🍱', '🥟', '🍤', '🍚', '🍥', '🥠', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🍯', '🥛', '🍼️', '🍵', '🥤', '🍶', '🍺', '🍻', '🍷', '🥃', '🍸', '🍹', '🍾', '🥡'];
const colorList = ["#42b983", "#33A5FF", "#B03734", "#2EAFB0", "#6EC1C2", "#ED9EC7", "#FCA650", "#3F7CFF", "#93C0A4", "#EA7E5C", "#F5CE50", "#465975", "#FFDD4D", "#7F2B82", "#4b4b4b", "#E41A6A"];

const PostItem = ({ edge: { node } }) => {
  const { frontmatter, timeToRead, excerpt } = node
  const { path, title, date, img } = frontmatter
  const iconIndex = Math.floor(Math.random() * iconList.length);
  const colorIndex = Math.floor(Math.random() * colorList.length);
  return (
    <div to={path} className="post-item">
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h2>
          {iconList[iconIndex]}
          <Link style={{ color: colorList[colorIndex] }} to={path}> {title} </Link>
        </h2>
        <div className="post-content-preview">
          {excerpt}
        </div>
        <p className="post-meta">
          发布于 {date} 预计阅读需要 {timeToRead} 分钟
      </p>
      </div>
      {
        img &&
        <img src={img} alt="" />
      }
    </div>
  )
};
export default PostItem
