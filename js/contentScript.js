var codeSection = $('code');
codeSection.attr('id', function(i) {
		return 'runThatCodeSnippetId_'+(i+1);
});
codeSection.prepend('<img src="http://i41.tinypic.com/33mc50w.png" class="runThatCodeIcon" />');

var runThatCodeIcon = $('.runThatCodeIcon');
runThatCodeIcon.attr('id', function(i) {
		return 'runThatCodeIconId_'+(i+1);
});

$(runThatCodeIcon).click(function(event) {
	var runThatCodeIconId = event.target.id;
	console.log('Info: A RunThatCode icon was pressed.');
	console.log('Info: RunThatCode icon is ' + runThatCodeIconId);

	var runThatCodeSnippetId = runThatCodeIconId.replace('runThatCodeIconId', 'runThatCodeSnippetId');
	console.log('Info: runThatCodeSnippetId is ' + runThatCodeSnippetId);
	var codeSnippet = $('#' + runThatCodeSnippetId).contents().text();
	console.log(codeSnippet);
});