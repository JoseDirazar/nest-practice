import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  getBookmarks(@GetUser(':id') userId: string) {
    return this.bookmarkService.getBookmarks(userId);
  }

  @Post()
  createBookmark(
    @GetUser('id') userId: string,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: string,
    @Param('id') bookmarkId: string,
  ) {
    return this.bookmarkService.getBookmarkById(userId, bookmarkId);
  }

  @Patch()
  editBookmarkById(
    @GetUser('id') userId: string,
    @Body() dto: EditBookmarkDto,
    @Param('id') bookmarkId: string,
  ) {
    return this.bookmarkService.editBookmarkById(userId, dto, bookmarkId);
  }

  @Delete(':id')
  deleteBookmarkById(
    @GetUser('id') userId: string,
    @Param('id') bookmarkId: string,
  ) {
    return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
  }
}
