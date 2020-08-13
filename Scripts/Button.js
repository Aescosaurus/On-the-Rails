class Button
{
	constructor( x,y,spr,hoverSpr )
	{
		this.x = x
		this.y = y
		this.spr = spr
		this.hoverSpr = hoverSpr
		
		this.hover = false
		this.canPress = false
		this.pressed = false
	}
	
	Update( mouse )
	{
		this.hover = this.spr.Contains( mouse.x,mouse.y,this.x,this.y )
		
		this.pressed = false
		if( mouse.down )
		{
			if( this.canPress )
			{
				if( this.hover )
				{
					this.pressed = true
				}
				this.canPress = false
			}
		}
		else this.canPress = true
		
		return( this.pressed )
	}
	
	Draw( gfx )
	{
		gfx.DrawSprite( this.x,this.y,( this.hover ? this.hoverSpr : this.spr ) )
	}
}