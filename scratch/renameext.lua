local f = function()
  local oldZex = 5
  print(oldZex)
end

vim.notify("Sourced")

function GlobalRename()
  local positional_param = vim.lsp.util.make_position_params()
  local new_name = vim.fn.input("New name: ")

  positional_param.newName = new_name
  vim.lsp.buf_request(0, "textDocument/rename", positional_param, function(err, result, ctx, config)
    if err then
      print("Error: ", err)
    end
    if result then
      local entries = {}

      for uri, edits in pairs(result.changes) do
        local bufnr = vim.uri_to_bufnr(uri)
        for _, edit in ipairs(edits) do
          local start_line = edit.range.start.line + 1
          local text = vim.api.nvim_buf_get_lines(bufnr, start_line - 1, start_line, false)[1]
          table.insert(entries, {
            bufnr = bufnr,
            lnum = start_line,
            col = edit.range.start.character + 1,
            text = text,
          })
        end
      end

      vim.fn.setqflist(entries, "r")

      vim.lsp.handlers["textDocument/rename"](err, result, ctx, config)
      print("Result: ", vim.inspect(result))
    end
  end)
end
