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
        <h2>联系 / Contact</h2>
        <p>
          Email: yingdongyang0305@outlook.com
          <br />
          LinkedIn: <a href="https://www.linkedin.com/in/yingdong-yang/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/yingdong-yang/</a>
        </p>
      </div>
    </div>
  );
}
