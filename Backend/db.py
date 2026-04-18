from datetime import datetime

from sqlalchemy import create_engine, Integer, String, func, DateTime, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker

engine = create_engine("sqlite:///./instance/test.db")

class Base(DeclarativeBase):
    pass

class Post(Base):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True, autoincrement=True)
    author_name: Mapped[str] = mapped_column(String)
    image_url: Mapped[str] = mapped_column(String)
    caption: Mapped[str] = mapped_column(String)
    like_count: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[DateTime] = mapped_column(DateTime, default=func.now())

    def __repr__(self):
        return f"Post(id={self.id!r}, author_name={self.author_name!r})"

try:
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)

except Exception as e:
    print(f"An error occurred during table creation: {e}")

if __name__ == "__main__":
    
    try:
        with Session() as session:
            stmt = select(Post)
            all_users = session.scalars(stmt).all()

            if not all_users:
                default_post = [
                    Post(
                        author_name="Aarav Drift",
                        image_url="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
                        caption="Weekend detail, fresh polish, and the V8 finally sounding right.",
                        like_count=128,
                        created_at=datetime(2026, 4, 18, 8, 15),
                    ),
                    Post(
                        author_name="Maya Torque",
                        image_url="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
                        caption="Track day setup complete. New tires, softer suspension, and a full tank.",
                        like_count=214,
                        created_at=datetime(2026, 4, 18, 9, 5),
                    ),
                    Post(
                        author_name="Noah Chrome",
                        image_url="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
                        caption="Clean lines, loud exhaust, and a sunset cruise through the city.",
                        like_count=176,
                        created_at=datetime(2026, 4, 18, 10, 40),
                    ),
                    Post(
                        author_name="Zara Apex",
                        image_url="https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=80",
                        caption="Built for corners, not just looks. This one finally feels dialed in.",
                        like_count=302,
                        created_at=datetime(2026, 4, 18, 12, 0),
                    ),
                    Post(
                        author_name="Ethan Rev",
                        image_url="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
                        caption="Nothing beats an early morning drive with the roads to yourself.",
                        like_count=94,
                        created_at=datetime(2026, 4, 18, 13, 25),
                    ),
                    Post(
                        author_name="Lina Velocity",
                        image_url="https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80",
                        caption="From garage project to show-ready in one winter. Worth every late night.",
                        like_count=241,
                        created_at=datetime(2026, 4, 18, 15, 10),
                    ),
                ]
                session.add_all(default_post)
                session.commit()
            else:
                for user in all_users:
                    # 'user' is an actual instance of our User class!
                    print(f"  Found: {user.__dict__}")
                    print("\n")
                

    except Exception as e:
        print(f"An error occurred during table creation: {e}")