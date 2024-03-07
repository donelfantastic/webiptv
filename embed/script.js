function override(url) {
      if (url.indexOf("licensing.bitmovin.com/licensing") > -1)
        return "data:text/plain;charset=utf-8;base64,eyJzdGF0dXMiOiJncmFudGVkIiwibWVzc2FnZSI6IlRoZXJlIHlvdSBnby4ifQ==";
      if (url.indexOf("licensing.bitmovin.com/impression") > -1)
        return "data:text/plain;charset=utf-8;base64,eyJzdGF0dXMiOiJncmFudGVkIiwibWVzc2FnZSI6IlRoZXJlIHlvdSBnby4ifQ==";
      return url;
    }
    var opens = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
      var url = override(arguments[1]);
      arguments[1] = url;
      return opens.apply(this, arguments);
    }
