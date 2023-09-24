import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async getBookmarks(userId: string) {
    const bookmarks = await this.prisma.bookMark.findMany({
      where: {
        userId,
      },
    });
    return bookmarks;
  }

  async createBookmark(userId: string, dto: CreateBookmarkDto) {
    const bookMark = await this.prisma.bookMark.create({
      data: {
        userId,
        ...dto,
      },
    });

    return bookMark;
  }

  getBookmarkById(userId: string, bookmarkId: string) {
    return this.prisma.bookMark.findUnique({
      where: {
        id: bookmarkId,
        userId,
      },
    });
  }

  async editBookmarkById(
    userId: string,
    dto: EditBookmarkDto,
    bookmarkId: string,
  ) {
    const editedBookmark = await this.prisma.bookMark.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    if (!editedBookmark || editedBookmark.userId !== userId)
      throw new ForbiddenException('Access to resource denied.');

    return this.prisma.bookMark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmarkById(userId: string, bookmarkId: string) {
    const bookMark = await this.prisma.bookMark.findUnique({
      where: {
        id: bookmarkId,
      },
    });
    if (!bookMark || bookMark.userId !== userId)
      throw new ForbiddenException('Access to resource denied.');

    await this.prisma.bookMark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
