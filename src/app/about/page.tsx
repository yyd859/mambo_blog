export const metadata = {
  title: "关于 / About — Mambo blog",
};

export default function AboutPage() {
  return (
    <div>
      <h1 style={{ fontFamily: "system-ui, sans-serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "2rem", letterSpacing: "-0.02em" }}>
        关于 / About
      </h1>
      <div className="prose">
        <p>
          这里是 Mambo blog，一个记录技术思考的地方。内容不经过 AI 处理，每一个字都由人写就。
          思考与理解，是无法被替代的。
        </p>
        <p>
          This is Mambo blog — a place for technical thoughts written entirely by hand.
          No AI-generated content. Thinking and understanding cannot be replaced.
        </p>

        <hr />

        <h2>写什么 / What I write about</h2>
        <ul>
          <li>编程与工程实践 / Programming &amp; engineering</li>
          <li>系统设计与架构 / System design &amp; architecture</li>
          <li>工具与效率 / Tools &amp; productivity</li>
          <li>读书与思考 / Reading &amp; thinking</li>
        </ul>

        <h2>语言 / Language</h2>
        <p>
          文章用中文或英文写成，取决于内容和心情。每篇文章都会标注语言。
        </p>
        <p>
          Posts are written in Chinese or English depending on the topic and mood.
          Each post is labeled with its language.
        </p>

        <h2>联系 / Contact</h2>
        <p>
          可以通过 GitHub 找到我。/ Find me on GitHub.
        </p>
      </div>
    </div>
  );
}
