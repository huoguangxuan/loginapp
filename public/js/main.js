$(document).ready(function(){
	$('.delete-article').on('click',function(e){
		$target = $(e.target);
		const id=$target.attr('data-id');
		$.ajax({
			type:'DELETE',
			url:'/articles/'+id,
			success:function(response){
				window.location.href='/';
			},
			error:function(err){
				alert(111)
				console.log(err);
			}
		})
	});
});