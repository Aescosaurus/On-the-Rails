class Graphics
{
	constructor()
	{
		this.canv = document.getElementById( "canv" )
		this.ctx = this.canv.getContext( "2d" )
		
		this.ctx.imageSmoothingEnabled = false
		this.ctx.mozImageSmoothingEnabled = false
		
		const scale = 1.0 / ( 120 / this.canv.width )
		this.scale = scale
		
		this.ctx.scale( scale,scale )
		
		this.scrWidth = this.canv.width / scale
		this.scrHeight = this.canv.height / scale
	}
	
	DrawRect( x,y,width,height,color )
	{
		this.ctx.fillStyle = color
		this.ctx.fillRect( x,y,width,height )
	}
	
	DrawCircle( x,y,radius,color )
	{
		this.ctx.strokeStyle = color
		this.ctx.beginPath()
		this.ctx.arc( x,y,radius,0,2 * Math.PI )
		this.ctx.stroke()
	}
	
	DrawSprite( x,y,sprite )
	{
		this.ctx.drawImage( sprite.img,Math.round( x ),Math.round( y ) )
	}
}