from sqlalchemy import create_engine, Integer, String, func, DateTime
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