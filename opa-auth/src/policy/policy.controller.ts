import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('policy')
export class PolicyController {
	@Get()
	findAll() {
		return []
	}

	@Post()
	create(@Body('name') name: String, @Query('isAdmin') isAdmin: Boolean) {
		return {
			id: crypto.randomUUID(),
			name,
			isAdmin
		}
	}

	@Patch('/:id')
	update(@Param('id') id: String) {
		return {
			id
		}
	}
}
