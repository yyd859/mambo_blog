export const metadata = {
  title: "关于 — Mambo blog",
};

export default function AboutPage() {
  return (
    <div className="page">
      <div className="about">
        <h1>关于 Mambo blog</h1>
        <p className="about__role">PERSONAL BLOG · SINCE 2024</p>
        <div className="prose">
          <p>
            这里是 Mambo blog，一个记录我身边有趣的、值得学习的地方的博客。
            Mambo 是我小猫的名字。
          </p>
          <p>
            内容涵盖技术、设计、读书，以及那些
            本以为理所当然、后来发现值得深究的事。
            每一个字都由人写就，不经过 AI 处理。
            思考与理解，是无法被替代的。
          </p>
          <p>
            This is Mambo blog — a place for thoughts and learning.
            Technology, design, reading, and the things I once took for granted.
            Written entirely by hand. Thinking and understanding cannot be replaced.
          </p>
          <hr />
          <h2>联系 / Contact</h2>
          <p>
            Email:{" "}
            <a href="mailto:yingdongyang0305@gmail.com">
              yingdongyang0305@gmail.com
            </a>
            <br />
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/yingdong-yang/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/yingdong-yang ↗
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
