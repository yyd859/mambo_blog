export const metadata = {
  title: "关于 — mambo blog",
};

export default function AboutPage() {
  return (
    <div>
      <h1 style={{ fontFamily: "system-ui, sans-serif", fontSize: "1.3rem", fontWeight: 700, marginBottom: "2rem", letterSpacing: "-0.02em" }}>
        关于
      </h1>
      <div className="prose">
        <p>
          这里是 mambo blog，一个记录技术思考的地方。
        </p>
        <p>
          内容不经过 AI 处理，每一个字都由人写就。思考与理解，是无法被替代的。
        </p>
        <h2>写什么</h2>
        <ul>
          <li>编程与工程实践</li>
          <li>系统设计与架构</li>
          <li>工具与效率</li>
          <li>读书与思考</li>
        </ul>
        <h2>联系</h2>
        <p>
          如果你想交流，可以通过 GitHub 找到我。
        </p>
      </div>
    </div>
  );
}
